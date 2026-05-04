# Stryd - Developer Learning Platform

```
stryd-ng/
├── .env
├── .env.local
├── .git/
├── .gitignore
├── .next/
├── eslint.config.mjs
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── actions.ts
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (focus)/
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   └── paths/
│   │   │       └── [id]/
│   │   │           ├── page.tsx
│   │   │           └── [stageId]/
│   │   │               ├── page.tsx
│   │   │               └── [taskId]/
│   │   │                   └── page.tsx
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── paths/
│   │   │   │   └── page.tsx
│   │   │   ├── progress/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── actions/
│   │   │   └── progress.ts
│   │   ├── api/
│   │   │   ├── paths/
│   │   │   │   ├── route.ts
│   │   │   │   └── [pathId]/
│   │   │   │       └── route.ts
│   │   │   ├── stages/
│   │   │   │   └── [stageId]/
│   │   │   │       └── tasks/
│   │   │   │           └── route.ts
│   │   │   ├── tasks/
│   │   │   │   └── [taskId]/
│   │   │   │       └── route.ts
│   │   │   └── user/
│   │   │       └── progress/
│   │   ├── error/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Logo.tsx
│   │   ├── PathCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StageButton.tsx
│   │   ├── SubmitButton.tsx
│   │   └── TaskStartBtn.tsx
│   ├── generated/
│   │   └── prisma/
│   │       ├── browser.ts
│   │       ├── client.ts
│   │       ├── commonInputTypes.ts
│   │       ├── enums.ts
│   │       ├── internal/
│   │       │   ├── class.ts
│   │       │   ├── prismaNamespace.ts
│   │       │   └── prismaNamespaceBrowser.ts
│   │       ├── models/
│   │       │   ├── Path.ts
│   │       │   ├── Stage.ts
│   │       │   ├── Task.ts
│   │       │   └── UserProgress.ts
│   │       └── models.ts
│   └── utils/
│       ├── lib/
│       │   ├── paths.ts
│       │   └── prismaClient.ts
│       └── supabase/
│           └── server.ts
└── tsconfig.json
```

Stryd is an execution-focused learning platform designed for developers who want to build real projects instead of just watching tutorials. It provides structured learning paths with hands-on tasks, progress tracking, and momentum building through streaks and achievements.

## 🚀 What This App Does

Stryd helps developers master technology stacks by:
- **Structured Learning Paths**: Organized curriculum from basics to advanced concepts
- **Hands-on Tasks**: Each lesson includes practical exercises and projects
- **Progress Tracking**: Visual progress bars and completion tracking
- **Streak System**: Daily coding streaks to maintain momentum
- **Authentication**: Secure user accounts with Supabase
- **Responsive Design**: Works on desktop and mobile devices

## 📘 How to Use This Repo

### Main Entry Points
- `app/page.tsx` - Landing page for visitors and sign-in entry point
- `(auth)/login/page.tsx` - Login page for existing users
- `(auth)/signup/page.tsx` - Signup page for new users
- `(main)/dashboard/page.tsx` - Authenticated dashboard view
- `(main)/paths/page.tsx` - List of available learning paths
- `(main)/progress/page.tsx` - Progress overview page
- `(main)/settings/page.tsx` - User settings page
- `(focus)/...` - Distraction-free path navigation and task flow

### Repo Workflow
- Edit UI in `src/app/...` and `src/components/...`
- Update database shape in `prisma/schema.prisma`
- Use `npx prisma generate` after schema changes
- Use `npx prisma db push` to sync with PostgreSQL
- Keep auth logic in `src/app/(auth)/actions.ts` and Supabase helpers in `src/utils/supabase/server.ts`

### Important note
The API folder contains endpoint routes, but the main UI currently uses server-side data fetching and server actions for most interactions. The `src/app/api/user/progress/` folder is present but empty, so progress updates are handled by `src/app/actions/progress.ts`.

## 🛠️ Tech Stack & Key Concepts

### Core Technologies
- **Next.js 16** - React framework with App Router for server-side rendering
- **React 19** - UI library with modern hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Prisma** - Database ORM with type-safe queries
- **PostgreSQL** - Relational database via Prisma adapter
- **Supabase** - Authentication and real-time features
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

#### Prisma Client Setup
- `src/utils/lib/prismaClient.ts` initializes Prisma using `@prisma/adapter-pg`
- Uses a global cache object during development to avoid creating multiple Prisma clients
- `DATABASE_URL` is read from environment variables

### Architecture Patterns

#### Next.js App Router
```
app/
├── (auth)/          # Route groups for auth pages (login/signup)
├── (main)/          # Protected routes for authenticated users
├── (focus)/         # Focused learning mode routes
├── api/             # API routes for data fetching
└── globals.css      # Global styles
```

**Route Groups**: Parentheses `()` create route groups that organize pages without affecting URLs. Useful for:
- `(auth)` - Authentication pages
- `(main)` - Main app pages (dashboard, paths, etc.)
- `(focus)` - Distraction-free learning mode

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
  if (!user) return

  const taskId = formData.get("taskId") as string
  const stageId = formData.get("stageId") as string
  const pathId = formData.get("pathId") as string

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
- Uses `revalidatePath()` to refresh the page data after completion
- Uses `redirect()` to navigate after the action succeeds

#### Database Schema (Prisma)

```prisma
model Path {
  id          String   @id @default(cuid())
  name        String
  description String?
  isLocked    Boolean  @default(false)
  order       Int      // Display order
  stages      Stage[]
}

model Stage {
  id          String   @id @default(cuid())
  name        String
  description String?
  order       Int
  isLocked    Boolean  @default(true)
  path        Path     @relation(fields: [pathId], references: [id])
  pathId      String
  tasks       Task[]
}

model Task {
  id           String         @id @default(cuid())
  title        String
  description  String
  resourceUrl  String?       // Link to tutorial/docs
  order        Int
  stage        Stage          @relation(fields: [stageId], references: [id])
  stageId      String
  userProgress UserProgress[]
}

model UserProgress {
  id          String   @id @default(cuid())
  userId      String   // From Supabase auth
  task        Task     @relation(fields: [taskId], references: [id])
  taskId      String
  completedAt DateTime @default(now())

  @@unique([userId, taskId]) // One completion per user-task
}
```

**Relationships**:
- Path → Stages (1:many)
- Stage → Tasks (1:many)
- Task → UserProgress (1:many)

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
│   │   └── progress/      # Progress overview
│   ├── (focus)/           # Learning mode (distraction-free)
│   ├── api/               # API routes
│   │   ├── paths/         # CRUD for paths
│   │   ├── stages/        # CRUD for stages
│   │   └── tasks/         # CRUD for tasks
│   └── actions/           # Server actions
├── components/            # Reusable UI components
│   ├── PathCard.tsx      # Path display card
│   ├── Sidebar.tsx       # Navigation sidebar
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
