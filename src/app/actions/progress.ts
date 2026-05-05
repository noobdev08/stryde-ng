"use server"

import prisma from "@/utils/lib/prismaClient"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function checkGitHubRepo(username: string, repo: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    })
    return res.status === 200
  } catch {
    return false
  }
}

export async function completeTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const taskId = formData.get("taskId") as string
  const stageId = formData.get("stageId") as string
  const pathId = formData.get("pathId") as string

  // Get stage expectedRepo and user's github username
  const [stage, profile] = await Promise.all([
    prisma.stage.findUnique({
      where: { id: stageId },
      select: { expectedRepo: true }
    }),
    prisma.userProfile.findUnique({
      where: { userId: user.id },
      select: { githubUsername: true }
    })
  ])

  // If stage requires a repo, verify it
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

export async function saveGithubUsername(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const githubUsername = formData.get("githubUsername") as string

  await prisma.userProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, githubUsername },
    update: { githubUsername },
  })

  revalidatePath("/settings")
  redirect("/settings?saved=true")
}