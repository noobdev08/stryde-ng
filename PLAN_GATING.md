# Stryd — Plan Gating + GitHub Verification

## Overview

This adds:
- `requiredPlan` on `Path` and `Stage` — drives what is locked in the UI
- `expectedRepo` on `Stage` — the GitHub repo name users must push to
- `githubUsername` on `UserProfile` — saved once, used for all verifications
- `canAccess` utility — checks user plan against required plan
- GitHub repo verification before marking a task complete
- `UpgradeModal` component — fires when a user hits a stage they cannot access

---

## Step 1 — Update `schema.prisma`

Add `requiredPlan` and `expectedRepo` to `Stage`, `requiredPlan` to `Path`, and a new `UserProfile` model to store the GitHub username:

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

---

## Step 2 — Run the migration

```bash
npx prisma migrate dev --name add_plan_gating_and_github
```

If this fails due to port issues run:

```bash
npx prisma db push
```

---

## Step 3 — Reset and reseed the DB

```bash
npx prisma migrate reset
```

Type `y` to confirm. Then seed the DB.

---

## Step 4 — Seed the DB

Each stage gets an `expectedRepo` name. Each task gets an `instruction` field — a short, specific action the user must complete and push to that repo.

Stage repo names to use:

| Stage | expectedRepo |
|---|---|
| Dev Environment — Setup | `stryd-setup` |
| Frontend — HTML | `stryd-html` |
| Frontend — CSS | `stryd-css` |
| Frontend — JavaScript | `stryd-javascript` |
| Frontend — React | `stryd-react` |

Task instructions follow this format:
> "Inside your `stryd-html` repo, create a folder called `task-01-intro`. Inside it, create an `index.html` file and write a short paragraph explaining what HTML is in your own words. Push it to GitHub."

---

## Step 5 — Create `src/utils/lib/plans.ts`

```ts
export type Plan = "free" | "basic" | "pro"

const planRank: Record<Plan, number> = {
  free: 0,
  basic: 1,
  pro: 2,
}

export function canAccess(userPlan: Plan, requiredPlan: string): boolean {
  return planRank[userPlan] >= planRank[requiredPlan as Plan]
}
```

---

## Step 6 — Create `src/utils/lib/github.ts`

This hits the public GitHub API to check if a repo exists for a given username:

```ts
export async function checkRepoExists(
  username: string,
  repo: string
): Promise<{ exists: boolean; error?: string }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 0 },
      }
    )

    if (res.status === 200) return { exists: true }
    if (res.status === 404) return { exists: false, error: "Repo not found" }

    return { exists: false, error: "GitHub API error" }
  } catch {
    return { exists: false, error: "Network error" }
  }
}
```

---

## Step 7 — Update `src/app/actions/progress.ts`

The `completeTask` action now:
1. Gets the user's GitHub username from `UserProfile`
2. Gets the stage's `expectedRepo`
3. Hits the GitHub API to verify the repo exists
4. Only creates the `UserProgress` record if the repo is found

```ts
"use server"

import prisma from "@/utils/lib/prismaClient"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { checkRepoExists } from "@/utils/lib/github"

export async function completeTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const taskId = formData.get("taskId") as string
  const stageId = formData.get("stageId") as string
  const pathId = formData.get("pathId") as string

  // Get user's GitHub username
  const profile = await prisma.userProfile.findUnique({
    where: { userId: user.id }
  })

  if (!profile?.githubUsername) {
    return { error: "Please save your GitHub username in Settings before completing tasks." }
  }

  // Get the stage's expected repo
  const stage = await prisma.stage.findUnique({
    where: { id: stageId },
    select: { expectedRepo: true }
  })

  // If stage has an expectedRepo, verify it exists on GitHub
  if (stage?.expectedRepo) {
    const { exists, error } = await checkRepoExists(
      profile.githubUsername,
      stage.expectedRepo
    )

    if (!exists) {
      return {
        error: `We couldn't find the repo "${stage.expectedRepo}" on your GitHub. Make sure you've pushed your work and your username is correct in Settings.`
      }
    }
  }

  // Mark task as complete
  await prisma.userProgress.upsert({
    where: { userId_taskId: { userId: user.id, taskId } },
    update: { completedAt: new Date() },
    create: { userId: user.id, taskId, completedAt: new Date() }
  })

  revalidatePath(`/paths/${pathId}/${stageId}`)
  redirect(`/paths/${pathId}/${stageId}`)
}

export async function saveGithubUsername(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const githubUsername = formData.get("githubUsername") as string

  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: { githubUsername },
    create: { userId: user.id, githubUsername }
  })

  revalidatePath("/settings")
  return { success: true }
}
```

---

## Step 8 — Update `src/app/(main)/settings/page.tsx`

Add a GitHub username input so the user can save it once:

```tsx
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import prisma from "@/utils/lib/prismaClient"
import { saveGithubUsername } from "@/app/actions/progress"
import { Github } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const profile = await prisma.userProfile.findUnique({
    where: { userId: user.id }
  })

  return (
    <main className="flex-1 p-8 md:p-12">
      <div className="max-w-xl">
        <h1 className="text-2xl font-black text-white mb-2">Settings</h1>
        <p className="text-slate-400 text-sm mb-10">Manage your account details</p>

        {/* GitHub Username */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Github size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-bold text-white">GitHub Username</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Required to verify your work before completing tasks
              </p>
            </div>
          </div>

          <form action={saveGithubUsername} className="flex flex-col gap-4">
            <input
              type="text"
              name="githubUsername"
              defaultValue={profile?.githubUsername || ""}
              placeholder="e.g. yourname"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm py-3 rounded-xl transition-all"
            >
              Save username
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
```

---

## Step 9 — Update `src/app/(focus)/paths/[id]/[stageId]/[taskId]/page.tsx`

The task page now needs to:
- Show the `instruction` field below the concept
- Show an error if GitHub verification fails
- Pass errors back to the UI from the server action

```tsx
import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Youtube, BookOpen, Github, AlertCircle } from "lucide-react"
import Link from "next/link"
import { completeTask } from "../../../../../actions/progress"
import StageButton from "../../../../../../components/StageButton"

export default async function TaskPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; stageId: string; taskId: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id, stageId, taskId } = await params
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      stage: {
        include: {
          tasks: { orderBy: { order: "asc" } }
        }
      },
      userProgress: { where: { userId: user.id } }
    }
  })

  if (!task) notFound()

  const isCompleted = task.userProgress.length > 0
  const taskNumber = task.stage.tasks.findIndex(t => t.id === taskId) + 1
  const totalTasks = task.stage.tasks.length
  const hasResources = task.resourceUrl || task.youtubeUrl

  const conceptParagraphs = task.concept
    ? task.concept
        .split(/(?<=[.!?])\s+(?=[A-Z])/)
        .reduce<string[]>((acc, sentence, i) => {
          const groupIndex = Math.floor(i / 3)
          if (!acc[groupIndex]) acc[groupIndex] = sentence
          else acc[groupIndex] += " " + sentence
          return acc
        }, [])
    : []

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-3xl mx-auto px-8 pt-12 pb-20">

        {/* Back */}
        <div className="mb-12">
          <Link href={`/paths/${id}/${stageId}`} className="text-slate-500 hover:text-white transition-colors inline-block">
            <ArrowLeft size={24} />
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Task {taskNumber} of {totalTasks}
          </p>
          <h1 className="text-5xl font-black leading-tight mb-6">
            {task.title}
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Concept */}
        {conceptParagraphs.length > 0 && (
          <div className="mb-14 p-8 rounded-2xl bg-[#0f172a] border border-slate-800">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
              The concept
            </p>
            <div className="flex flex-col gap-5">
              {conceptParagraphs.map((para, i) => (
                <p key={i} className="text-slate-300 text-base leading-[1.85]">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Instruction */}
        {task.instruction && (
          <div className="mb-14 p-8 rounded-2xl bg-[#0f172a] border border-blue-500/20">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">
              Your task
            </p>
            <p className="text-white text-base leading-[1.85]">
              {task.instruction}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
              <Github size={15} className="text-slate-500 shrink-0" />
              <p className="text-slate-500 text-xs">
                Push your work to GitHub before marking this complete. We will verify your repo exists.
              </p>
            </div>
          </div>
        )}

        {/* Resources */}
        {hasResources && (
          <div className="mb-14">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              Dive deeper
            </p>
            <div className="flex flex-col gap-3">
              {task.resourceUrl && (
                <Link
                  href={task.resourceUrl}
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <BookOpen size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">MDN Docs</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
              {task.youtubeUrl && (
                <Link
                  href={task.youtubeUrl}
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <Youtube size={18} className="text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">Watch on YouTube</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-red-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{decodeURIComponent(error)}</p>
          </div>
        )}

        {/* Complete */}
        <div className="border-t border-slate-900 pt-10">
          <h3 className="text-xs font-black text-slate-200 mb-2 uppercase tracking-widest">
            Mark as complete
          </h3>
          <p className="text-slate-500 text-sm mb-8">
            Push your work to GitHub first. We will check your repo before marking this done.
          </p>
          <form action={completeTask}>
            <input type="hidden" name="taskId" value={taskId} />
            <input type="hidden" name="stageId" value={stageId} />
            <input type="hidden" name="pathId" value={id} />
            <StageButton label="Complete Task" completed={isCompleted} />
          </form>
        </div>

      </div>
    </main>
  )
}
```

---

## Step 10 — Update `completeTask` to redirect with error

Since server actions can't return values to server components directly, redirect with the error as a query param when verification fails:

Update `src/app/actions/progress.ts` — replace the `if (!exists)` block with:

```ts
if (!exists) {
  redirect(
    `/paths/${pathId}/${stageId}/${taskId}?error=${encodeURIComponent(
      `We couldn't find the repo "${stage.expectedRepo}" on your GitHub. Make sure you've pushed your work and your username is correct in Settings.`
    )}`
  )
}
```

---

## Step 11 — Add `UpgradeModal` component

Create `src/components/UpgradeModal.tsx`:

```tsx
"use client"

import { X, Lock, Zap, Check } from "lucide-react"
import Link from "next/link"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  stageName: string
  requiredPlan: "basic" | "pro"
}

export default function UpgradeModal({
  isOpen,
  onClose,
  stageName,
  requiredPlan,
}: UpgradeModalProps) {
  if (!isOpen) return null

  const isBasic = requiredPlan === "basic"

  const features = isBasic
    ? [
        "Full Frontend path — CSS, JS, React",
        "Projects & Capstone stages",
        "Priority support",
      ]
    : [
        "Everything in Basic",
        "Backend, Fullstack & DevOps paths",
        "AI-powered feedback",
        "Community access",
      ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
          <Lock size={22} className="text-blue-400" />
        </div>

        <h2 className="text-2xl font-black text-white mb-2">
          {stageName} is locked
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          Upgrade to{" "}
          <span className="text-white font-bold">
            {isBasic ? "Basic" : "Pro"}
          </span>{" "}
          to unlock this stage and keep building.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <Check size={14} className="text-blue-500 shrink-0" />
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mb-6 flex items-center justify-between">
          <span className="text-slate-400 text-sm font-medium">
            {isBasic ? "Basic plan" : "Pro plan"}
          </span>
          <span className="text-white font-black">
            {isBasic ? "₦3,500" : "Coming soon"}{" "}
            <span className="text-slate-500 font-normal text-xs">/month</span>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/pricing"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2"
          >
            <Zap size={15} />
            Upgrade to {isBasic ? "Basic" : "Pro"}
          </Link>
          <button
            onClick={onClose}
            className="w-full text-slate-500 hover:text-white text-sm py-2 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## Step 12 — Wire the modal to locked stages

The stage list page (`/paths/[id]/page.tsx`) needs to be a client component to use the modal. Extract the stage list into a client component:

Create `src/components/StageList.tsx`:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, ChevronRight } from "lucide-react"
import UpgradeModal from "@/components/UpgradeModal"
import { canAccess, Plan } from "@/utils/lib/plans"

interface Stage {
  id: string
  name: string
  description: string | null
  isLocked: boolean
  requiredPlan: string
  tasks: { userProgress: { id: string }[] }[]
}

interface StageListProps {
  stages: Stage[]
  pathId: string
  userPlan: Plan
}

export default function StageList({ stages, pathId, userPlan }: StageListProps) {
  const [modalStage, setModalStage] = useState<Stage | null>(null)

  return (
    <>
      <div className="flex flex-col gap-3">
        {stages.map((stage) => {
          const accessible = canAccess(userPlan, stage.requiredPlan)
          const completedTasks = stage.tasks.filter(
            (t) => t.userProgress.length > 0
          ).length
          const totalTasks = stage.tasks.length

          if (accessible) {
            return (
              <Link
                key={stage.id}
                href={`/paths/${pathId}/${stage.id}`}
                className="flex items-center justify-between p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stage.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {completedTasks} / {totalTasks} tasks complete
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-600 group-hover:text-slate-400 transition-colors"
                />
              </Link>
            )
          }

          return (
            <button
              key={stage.id}
              onClick={() => setModalStage(stage)}
              className="flex items-center justify-between p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group text-left w-full opacity-60"
            >
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  {stage.name}
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {stage.requiredPlan}
                  </span>
                </p>
                <p className="text-slate-500 text-xs mt-1">{stage.description}</p>
              </div>
              <Lock size={16} className="text-slate-600 shrink-0" />
            </button>
          )
        })}
      </div>

      {modalStage && (
        <UpgradeModal
          isOpen={true}
          onClose={() => setModalStage(null)}
          stageName={modalStage.name}
          requiredPlan={modalStage.requiredPlan as "basic" | "pro"}
        />
      )}
    </>
  )
}
```

Then in your `/paths/[id]/page.tsx` server component, import `StageList` and pass the stages and userPlan to it:

```tsx
// Hardcode for MVP, swap for real plan from user metadata when payments are live
const userPlan: Plan = "free"

<StageList stages={path.stages} pathId={id} userPlan={userPlan} />
```

---

## Step 13 — Commit

```bash
git add .
git commit -m "feat: plan gating, github verification, upgrade modal"
git push
```

---

## Notes

- `userPlan` is hardcoded as `"free"` everywhere for MVP. When Paystack is live, store the plan in Supabase user metadata as `user.user_metadata.plan` and read it from there.
- The GitHub API allows 60 unauthenticated requests per hour per IP. This is fine for MVP. Add a GitHub personal access token to the fetch headers later if you need higher limits.
- `expectedRepo` is nullable on `Stage` — the Dev Environment capstone task and any future stages without a repo requirement simply skip the GitHub check.
