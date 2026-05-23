# Stryd - Developer Learning Platform

Stryd is an execution-focused developer learning platform built with Next.js, TypeScript, Prisma, PostgreSQL, and Supabase. The MVP is centered around structured learning paths, task completion tracking, and GitHub repo validation for gated stages.

## 🚀 What This App Does

- Structured learning paths with ordered paths, stages, and tasks
- Hand-off task completion tracking stored per user in the database
- GitHub repository validation for stages using `validationType === "repo_exists"`
- Plan gating with `free`, `basic`, and `pro` levels
- Supabase authentication and server-side session handling
- Focused learning mode with distraction-free path/stage/task navigation

## ⚙️ Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.local` from `.env` if needed
   - Set `DATABASE_URL` for PostgreSQL
   - Add Supabase credentials required by `src/utils/supabase/server.ts`

3. Initialize the database and seed data:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

> The repository is configured with Prisma seed through `package.json` using `node --loader ts-node/esm prisma/seed.ts`.

## 🔧 Current App Structure

- `src/app/page.tsx` — public landing page
- `src/app/(auth)/login/page.tsx` — login page
- `src/app/(auth)/signup/page.tsx` — signup page
- `src/app/(main)/dashboard/page.tsx` — authenticated dashboard
- `src/app/(main)/paths/page.tsx` — available learning paths
- `src/app/(main)/pricing/page.tsx` — plan gating / pricing page
- `src/app/(main)/progress/page.tsx` — progress overview
- `src/app/(main)/settings/page.tsx` — user settings and GitHub username
- `src/app/(focus)/paths/[id]/[stageId]/[taskId]/page.tsx` — focused task flow
- `src/app/actions/progress.ts` — server actions for task completion and GitHub username saving
- `prisma/schema.prisma` — Prisma data model for paths, stages, tasks, profiles, and progress
- `prisma/seed.ts` — seed script that creates initial paths, stages, and tasks

## 🧠 Seed Script Details (`prisma/seed.ts`)

- Clears existing seedable data: `UserProgress`, `Task`, `Stage`, and `Path`
- Creates initial `Path` records such as `Dev Environment` and `Frontend`
- Creates stage records with `requiredPlan`, `isLocked`, `expectedRepo`, and `validationType`
- Creates detailed task records with `title`, `description`, `concept`, `instruction`, `resourceUrl`, `youtubeUrl`, and ordering
- Some stages are gated by GitHub repo validation and require a specific repo name to unlock

## ✅ Task Completion & Validation (`src/app/actions/progress.ts`)

- `completeTask(formData)` is the main server action used to mark tasks complete
- It validates the currently authenticated Supabase user and redirects to `/login` if none exists
- It loads stage metadata and the current user profile at the same time
- If `validationType === "repo_exists"`, it checks GitHub for the expected repo name using the saved GitHub username
- On validation failure, it redirects back to the task page with an error query string
- On success, it upserts the `UserProgress` entry and invalidates the stage path cache
- `saveGithubUsername(formData)` stores or updates the user's GitHub username in `UserProfile`

## 📦 Prisma Schema Overview (`prisma/schema.prisma`)

The schema includes:

- `Path` — learning path container, ordered via `order`, gated by `requiredPlan`
- `Stage` — belongs to a path, can require GitHub repo validation using `expectedRepo` and `validationType`
- `Task` — belongs to a stage, includes instructional fields and ordering
- `UserProfile` — stores `githubUsername` for GitHub validation
- `UserProgress` — records per-user completed tasks and enforces a unique `(userId, taskId)` constraint

The Prisma generator outputs client code to `src/generated/prisma`, and the database provider is PostgreSQL.

## 📌 Important Notes

- Progress updates are handled by `src/app/actions/progress.ts`, not primarily through API routes.
- `src/app/api/user/progress/` exists but is not the main completion flow.
- Supabase is used for auth; Prisma is used for application data.
- The app supports route groups `(auth)`, `(main)`, and `(focus)` for cleaner page organization.

## 🛠 Useful Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — generate Prisma client and build the app
- `npm start` — start production server
- `npm run lint` — run ESLint

## 🚀 Contributor Workflow

- Update `prisma/schema.prisma` for any data model changes
- Run `npx prisma generate` after schema changes
- Update `prisma/seed.ts` if seeded path/stage/task data changes
- Use `src/utils/lib/plans.ts` for plan gating logic
- Use `src/utils/supabase/server.ts` for Supabase server-side auth

#### Server Actions
Server actions allow your form submissions and user actions to run securely on the server without a separate API route.

```typescript
// In a page or component
<form action={completeTask}>
  <input type="hidden" name="taskId" value={task.id} />
  <input type="hidden" name="stageId" value={stage.id} />
  <input type="hidden" name="pathId" value={path.id} />
  <button type="submit">Complete Task</button>
</form>

// Server action in src/app/actions/progress.ts
"use server"
export async function completeTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const taskId = formData.get("taskId") as string
  const stageId = formData.get("stageId") as string
  const pathId = formData.get("pathId") as string

  const [stage, profile] = await Promise.all([
    prisma.stage.findUnique({ where: { id: stageId }, select: { expectedRepo: true } }),
    prisma.userProfile.findUnique({ where: { userId: user.id }, select: { githubUsername: true } })
  ])

  if (stage?.expectedRepo) {
    if (!profile?.githubUsername) {
      redirect(`/paths/${pathId}/${stageId}/${taskId}?error=${encodeURIComponent("Set your GitHub username in Settings before completing tasks.")}`)
    }

    const repoExists = await checkGitHubRepo(profile.githubUsername, stage.expectedRepo)
    if (!repoExists) {
      redirect(`/paths/${pathId}/${stageId}/${taskId}?error=${encodeURIComponent(`Repo not found: github.com/${profile.githubUsername}/${stage.expectedRepo} — make sure it's public and you've pushed your work.`)}`)
    }
  }

  await prisma.userProgress.upsert({
    where: { userId_taskId: { userId: user.id, taskId } },
    update: { completedAt: new Date() },
    create: { userId: user.id, taskId, completedAt: new Date() }
  })

  revalidatePath(`/paths/${pathId}/${stageId}`)
  redirect(`/paths/${pathId}/${stageId}`)
}
```

**Key Benefits**:
- No separate API endpoint required for this task mutation
- Built-in form handling in server components
- Server-side auth check with Supabase
- Verifies GitHub repo existence when a stage requires it
- Uses `revalidatePath()` to refresh the page data after completion
- Uses `redirect()` to navigate after the action succeeds

#### Database Schema (Prisma)

```prisma
model Path {
  id           String   @id @default(cuid())
  name         String
  description  String?
  isLocked     Boolean  @default(false)
  requiredPlan String   @default("free")
  order        Int
  stages       Stage[]
  createdAt    DateTime @default(now())
}

model Stage {
  id           String   @id @default(cuid())
  name         String
  description  String?
  order        Int
  isLocked     Boolean  @default(true)
  requiredPlan String   @default("free")
  expectedRepo String?
  path         Path     @relation(fields: [pathId], references: [id])
  pathId       String
  tasks        Task[]
  createdAt    DateTime @default(now())
}

model Task {
  id           String         @id @default(cuid())
  title        String
  description  String
  concept      String?
  instruction  String?
  resourceUrl  String?
  youtubeUrl   String?
  order        Int
  stage        Stage          @relation(fields: [stageId], references: [id])
  stageId      String
  userProgress UserProgress[]
  createdAt    DateTime       @default(now())
}

model UserProfile {
  id             String   @id @default(cuid())
  userId         String   @unique
  githubUsername String?
  createdAt      DateTime @default(now())
}

model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  task        Task     @relation(fields: [taskId], references: [id])
  taskId      String
  completedAt DateTime @default(now())

  @@unique([userId, taskId])
}
```

**Relationships**:
- Path → Stages (1:many)
- Stage → Tasks (1:many)
- Task → UserProgress (1:many)
- UserProfile stores GitHub usernames for authenticated users

#### Authentication with Supabase

```typescript
// Server-side auth check in a page or server action
const supabase = await createClient()
const { data: { user }, error } = await supabase.auth.getUser()
if (error || !user) redirect('/login')
```

```typescript
// Signup / login / logout actions in src/app/(auth)/actions.ts
const supabase = await createClient()
await supabase.auth.signUp({ email, password, options: { data: { name } } })
await supabase.auth.signInWithPassword({ email, password })
await supabase.auth.signOut()
```

**Supabase Concepts**:
- **SSR Helper**: `src/utils/supabase/server.ts` uses `createServerClient()` from `@supabase/ssr`
- **Cookie forwarding**: The helper reads and sets cookies from `next/headers` so auth works in server components
- **User metadata**: Extra fields like `name` are stored in `user.user_metadata`
- **Server-side auth**: Route protection is enforced in server pages by redirecting if `user` is missing
- **Logout flow**: Calls `signOut()` and then redirects to the homepage

#### Progress Calculation

```typescript
// Calculate path completion percentage
const allTasks = path.stages.flatMap(s => s.tasks)
const completedTasks = allTasks.filter(t => t.userProgress.length > 0)
const progressPercent = Math.round((completedTasks.length / allTasks.length) * 100)
```

**Progress Tracking**:
- Tasks are marked complete via server actions
- Progress bars show completion across paths/stages
- Streaks calculated from recent activity (currently hardcoded as "3")

## 📁 Project Structure Explained

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login/signup)
│   ├── (main)/            # Protected app pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── paths/         # Browse learning paths
│   │   ├── pricing/       # Pricing and plan gating
│   │   ├── progress/      # Progress overview
│   │   └── settings/      # User profile and GitHub settings
│   ├── (focus)/           # Learning mode (distraction-free)
│   ├── api/               # API routes
│   │   ├── paths/         # CRUD for paths
│   │   ├── stages/        # CRUD for stages
│   │   └── tasks/         # CRUD for tasks
│   └── actions/           # Server actions
├── components/            # Reusable UI components
│   ├── PathCard.tsx      # Path display card
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── SubmitButton.tsx  # Generic button for auth forms
│   ├── usernameButton.tsx# Save GitHub username button
│   └── TaskStartBtn.tsx  # Task interaction button
├── generated/             # Prisma generated types
└── utils/                 # Utility functions
    ├── lib/               # Database and path helpers
    └── supabase/          # Supabase client setup
```

## 🔧 Key Components & Their Purpose

### PathCard Component
Displays learning paths with progress visualization:

```typescript
interface PathCardProps {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  progress: number      // 0-100 completion percentage
  isLocked?: boolean
}
```

**Features**:
- Locked state for premium content
- Hover animations and visual feedback
- Progress bar with percentage display
- Responsive design (stacks on mobile)

### Sidebar Navigation
Context-aware navigation that changes based on current route:

```typescript
// Dynamic navigation items based on path structure
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/paths', label: 'Paths', icon: BookOpen },
  // ... more items
]
```

### Task Components
Handle task interactions and progress updates:

```typescript
// Server action for task completion
export async function completeTask(formData: FormData) {
  const taskId = formData.get("taskId") as string
  // Upsert ensures no duplicate completions
  await prisma.userProgress.upsert({
    where: { userId_taskId: { userId: user.id, taskId } },
    update: { completedAt: new Date() },
    create: { userId: user.id, taskId }
  })
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Supabase account

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up database**:
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Seed with sample data
npx prisma db seed
```

3. **Configure environment variables**:
Create `.env.local` with:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

4. **Run development server**:
```bash
npm run dev
```

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📚 Learning Path Structure

### Path Types
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, databases, APIs
- **Fullstack**: Complete web applications
- **Data Structures**: Algorithms and data structures

### Stage Organization
Each path contains multiple stages:
1. **Foundation** - Basic concepts
2. **Core Skills** - Essential techniques
3. **Projects** - Hands-on building
4. **Advanced** - Complex topics

### Task Format
Each task includes:
- **Title**: Clear, actionable description
- **Description**: Detailed instructions
- **Resource URL**: Links to tutorials/docs
- **Completion Tracking**: Automatic progress updates

## 🔐 Authentication Flow

1. **Signup**: Create account with email/password
2. **Email Verification**: Supabase handles email confirmation
3. **Login**: Authenticate and redirect to dashboard
4. **Session Management**: Automatic token refresh
5. **Logout**: Clear session and redirect to landing

## 🎨 Styling & UI Patterns

### Tailwind CSS Classes Used
- **Backgrounds**: `bg-[#0f172a]` (dark slate), gradients for accents
- **Borders**: `border-slate-800`, `border-blue-500/20` (semi-transparent)
- **Text**: `text-white`, `text-slate-400`, `text-blue-400`
- **Animations**: `hover:scale-110`, `transition-all duration-500`
- **Layout**: Flexbox with responsive breakpoints (`md:` prefixes)

### Design System
- **Colors**: Navy blue theme with slate grays
- **Typography**: Bold headings, medium body text
- **Spacing**: Consistent padding/margins using Tailwind scale
- **Icons**: Lucide React icons with consistent sizing
- **Shadows**: Subtle shadows with blue tints on hover

## 🔄 Data Flow & State Management

### Server-Side Data Fetching
```typescript
// In page components
export default async function PathsPage() {
  const paths = await prisma.path.findMany({
    include: {
      stages: {
        include: {
          tasks: {
            include: {
              userProgress: { where: { userId: user.id } }
            }
          }
        }
      }
    }
  })
  // Data passed to client components
}
```

### Client-Side Updates
```typescript
// Forms trigger server actions
<form action={completeTask}>
  <input type="hidden" name="taskId" value={task.id} />
  <button>Complete</button>
</form>

// Server action updates database and revalidates
revalidatePath('/current-path')
```

## 🚨 Error Handling

### Authentication Errors
- Redirect to `/error` page on auth failures
- Console logging for debugging
- User-friendly error messages

### Database Errors
- Prisma handles connection issues
- Graceful fallbacks for missing data
- Validation at database level with constraints

## 🔍 API Routes

### RESTful Endpoints
- `GET /api/paths` - Fetch all learning paths
- `GET /api/paths/[pathId]` - Fetch all stages in a path
- `GET /api/stages/[stageId]/tasks` - Fetch all tasks for a stage plus user progress
- `POST /api/tasks/[taskId]` - Create a `UserProgress` record for the current user and task

### Server Action Pattern
Instead of traditional REST APIs, most mutations use Next.js server actions for:
- Better type safety
- Automatic form handling
- Server-side validation
- Reduced client-server round trips

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default styles
- **Desktop**: `md:` prefixed classes
- **Large screens**: `lg:` for additional spacing

### Layout Patterns
- **Mobile-first**: Single column on small screens
- **Desktop**: Multi-column layouts with sidebars
- **Flexible grids**: CSS Grid and Flexbox combinations

## 🔧 Development Tips

### Adding New Paths
1. Create path in database via Prisma Studio or seed script
2. Add stages with proper ordering
3. Create tasks with descriptions and resource links
4. Test progress calculation logic

### Component Development
- Use TypeScript interfaces for props
- Follow existing naming conventions
- Test responsive behavior on different screen sizes
- Use Lucide icons consistently

### Database Changes
```bash
# After schema changes
npx prisma generate  # Update TypeScript types
npx prisma db push   # Apply to database
```

### Debugging
- Use `console.log` in server actions for debugging
- Check browser network tab for API calls
- Use React DevTools for component inspection
- Prisma Studio for database queries

## 🚀 Deployment

### Environment Setup
- Set production database URL
- Configure Supabase production keys
- Set up proper CORS policies

### Build Process
```bash
npm run build  # Generates optimized production build
npm run start  # Serves production build
```

### Hosting Recommendations
- **Vercel**: Seamless Next.js deployment
- **Railway/Netlify**: Full-stack hosting with databases
- **Self-hosted**: Docker containers for custom deployments

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use ESLint for code quality
3. Test components across different screen sizes
4. Follow existing component patterns
5. Update README for new features

## 📝 Key Syntax & Patterns

### TypeScript Interfaces
```typescript
interface Path {
  id: string
  name: string
  description?: string
  isLocked: boolean
  order: number
  stages: Stage[]
}
```

### Prisma Queries
```typescript
// Include related data
const paths = await prisma.path.findMany({
  include: {
    stages: {
      include: {
        tasks: true
      }
    }
  }
})
```

### Supabase Auth
```typescript
// Server component
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Tailwind Responsive
```jsx
<div className="flex flex-col md:flex-row">
  {/* Stacks vertically on mobile, horizontally on desktop */}
</div>
```

### Server Actions
```typescript
"use server"
export async function myAction(formData: FormData) {
  // Server-side logic
  revalidatePath('/page-to-refresh')
}
```

This comprehensive guide covers all the core concepts, technologies, and patterns used in Stryd. The codebase emphasizes type safety, modern React patterns, and scalable architecture for a learning platform.