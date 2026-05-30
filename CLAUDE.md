# Stryd Project Context

## Project Overview

**Stryd** is a developer learning platform where users progress through structured learning paths (Paths → Stages → Tasks) with automatic progress tracking and GitHub repo validation.

**Key Tech Stack**:
- Next.js 16 (App Router, Server Components)
- TypeScript (strict mode)
- Prisma + PostgreSQL
- Supabase (authentication)
- Tailwind CSS

## Architecture Philosophy

### Core Principles

1. **Server-first by default** - Pages are async server components unless interactivity is needed
2. **Type safety** - All data goes through Prisma types and TypeScript
3. **DRY (Don't Repeat Yourself)** - Utilities extracted when code appears 2+ times
4. **Centralized logic** - Business logic in `src/utils/lib/`, not scattered in pages

### Recent Refactoring (May 2026)

**Major consolidation**: Reduced code duplication by 50+ lines across 7 areas:

| Before | After | Files |
|--------|-------|-------|
| 4 button components | 1 ActionButton component | Deleted 4, Created 1 |
| Progress calc in 4 places | progressCalculator.ts | Created 1 utility |
| Path queries duplicated | pathQueries.ts | Created 1 utility |
| Duplicate GitHub checks | github.ts (consolidated) | Modified 1 utility |
| Auth error handling duplicated | authErrors.ts | Created 1 utility |
| API auth boilerplate | apiAuth.ts middleware | Created 1 middleware |
| Progress bars in 3 pages | ProgressBar.tsx component | Created 1 component |

**Impact**: Easier to maintain, fewer bugs, more consistent UX.

## File Navigation Guide

### Key Files by Function

**Authentication**:
- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/(auth)/signup/page.tsx` - Signup page  
- `src/app/(auth)/actions.ts` - Auth server actions (uses `authErrors.ts`)

**Learning Experience**:
- `src/app/(main)/dashboard/page.tsx` - Main hub (uses `progressCalculator.ts`, `getAllPathsWithProgress`)
- `src/app/(main)/paths/page.tsx` - Browse paths (uses `calculatePathProgress`)
- `src/app/(focus)/paths/[id]/[stageId]/[taskId]/page.tsx` - Task page (uses `ActionButton`, `completeTask` action)

**Data & Logic**:
- `src/utils/lib/progressCalculator.ts` - Pure: Calculate progress from tasks
- `src/utils/lib/pathQueries.ts` - DB: Fetch paths with nested data
- `src/utils/lib/github.ts` - External: Check if GitHub repo exists
- `src/utils/lib/authErrors.ts` - Pure: Map error messages to user-friendly text
- `src/app/actions/progress.ts` - Server action: Mark tasks complete + GitHub validation

**Components**:
- `src/components/ActionButton.tsx` - Unified button (submit/navigate/completed states)
- `src/components/ProgressBar.tsx` - Reusable progress visualization
- `src/components/PathCard.tsx` - Path display card with progress

**Database**:
- `prisma/schema.prisma` - Data model
- `src/utils/lib/prismaClient.ts` - Prisma singleton
- `src/generated/prisma/` - Auto-generated types (don't edit)

## Common Workflows

### To understand how task completion works:

1. Read: `src/components/ActionButton.tsx` - How the button works
2. Read: `src/app/(focus)/paths/[id]/[stageId]/[taskId]/page.tsx` - Where button is used
3. Read: `src/app/actions/progress.ts` - What happens when submitted
4. Key line: `await checkRepoExists(username, repo)` - GitHub validation

### To add a new reusable utility:

1. Create in `src/utils/lib/myUtility.ts`
2. Export pure functions (no side effects)
3. Import and use in multiple places
4. Example: `progressCalculator.ts` is used in 4+ pages

### To update button styling globally:

1. Edit: `src/components/ActionButton.tsx`
2. All buttons using it update automatically
3. No need to touch individual pages

### To debug progress not updating:

1. Check: Does user have `UserProgress` record in DB?
2. Check: Did `completeTask()` in `progress.ts` execute?
3. Check: Did `revalidatePath()` clear the ISR cache?
4. Check: Is browser showing cached page?

## Data Model (Mental Model)

```
Path ("Frontend")
  ├─ Stage ("HTML Basics") [validationType: "repo_exists", expectedRepo: "html-project"]
  │  ├─ Task ("Create first HTML file") [order: 1]
  │  ├─ Task ("Add semantic HTML") [order: 2]
  │  └─ Task ("Build multi-page site") [order: 3]
  │
  └─ Stage ("CSS & Styling") [validationType: null]
     └─ Task ("Learn Flexbox") [order: 1]

User can complete tasks → UserProgress records created
Progress calculation: "How many tasks have UserProgress records?" / "Total tasks"
```

## Key Concepts

### Server Components (Default)
- No `"use client"` needed
- Can fetch database directly
- Run only on server
- Better performance (no JS to browser)
- Can't use hooks like `useState`

### Client Components (When needed)
- Start with `"use client"`
- Can use React hooks
- Interactive features only
- Examples: `ActionButton.tsx`, forms with status updates

### Server Actions
- Securely call server code from forms
- No JSON serialization needed
- Type-safe automatically
- Auth happens on server
- No API endpoint required
- Example: `completeTask()` in `src/app/actions/progress.ts`

### Centralized Utilities
- Business logic in `src/utils/lib/`
- Pure functions (same input → same output)
- Easy to test
- Easy to optimize globally
- Examples: `progressCalculator.ts`, `authErrors.ts`

## When Refactoring

**Red flags for duplication**:
- Same 5+ lines of code in 2+ files
- Similar component with slight variations
- Database query repeated in multiple pages
- Error handling logic spread across files

**How to refactor**:
1. Extract to utility in `src/utils/lib/`
2. Import where needed
3. Test that behavior is identical
4. Delete old code
5. Commit with clear message

**Example**:
```typescript
// Found this 4 times:
const completed = tasks.filter(t => t.userProgress.length > 0)
const percent = Math.round((completed.length / tasks.length) * 100)

// Created:
export function calculateTaskProgress(tasks) { /* ... */ }

// Used everywhere:
const { progressPercent } = calculateTaskProgress(tasks)
```

## Debugging Checklist

- [ ] Did page fetch the data it needs? (Check async functions)
- [ ] Is user authenticated? (Check redirect to `/login`)
- [ ] Are types correct? (Run `npx tsc --noEmit`)
- [ ] Did server action execute? (Check console logs)
- [ ] Is cache stale? (Check `revalidatePath()` calls)
- [ ] Is component rendered correctly? (Check browser DevTools)
- [ ] Are environment variables set? (Check `.env.local`)

## Performance Notes

- **Server-rendering**: Pages render on server, faster initial load
- **ISR caching**: Pages can be pre-rendered and cached (see `revalidate = 60`)
- **Minimal JS**: Server components don't ship JavaScript to browser
- **Database queries**: Use `include` to avoid multiple queries
- **Progress calculation**: Computed on-the-fly, not stored

## Next Developer Tips

1. **Understand the hierarchy**: Path → Stage → Task (never skip levels)
2. **Check before copying**: Is there already a utility for this?
3. **Follow naming**: `calculateX`, `queryY`, `checkZ` make intent clear
4. **Type everything**: Let TypeScript catch bugs early
5. **Test in browser**: Refactored components still look right?

## Git Commit History

Key commits to understand refactoring:
- `594745d` - Consolidate duplicated components and utilities (latest refactoring)
  - 4 button files → 1 ActionButton
  - Progress calc deduplicated
  - GitHub repo check consolidated
  - API auth middleware extracted
  - Progress bar componentized

## Questions? Check These Files

| Question | File |
|----------|------|
| "How do buttons work?" | `src/components/ActionButton.tsx` |
| "How is progress calculated?" | `src/utils/lib/progressCalculator.ts` |
| "How are tasks completed?" | `src/app/actions/progress.ts` |
| "How does auth work?" | `src/app/(auth)/actions.ts` |
| "What's the data structure?" | `prisma/schema.prisma` |
| "How are error messages handled?" | `src/utils/lib/authErrors.ts` |
| "How are pages organized?" | `src/app/` structure |

---

**Last Updated**: May 28, 2026
**Last Refactoring**: Consolidated 7 areas of duplication (7 issues → 1 solution each)
**Status**: Actively maintained, type-safe, DRY architecture
