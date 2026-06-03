"use server"

import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect } from "next/navigation"

export async function completeOnboarding(level: "beginner" | "intermediate" | "advanced") {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  await prisma.userProfile.update({
    where: { userId: user.id },
    data: {
      level,
      hasCompletedOnboarding: true
    }
  })

  if (level === "beginner") {
    redirect("/dashboard")
  } else if (level === "intermediate") {
    redirect("/paths")
  } else if (level === "advanced") {
    redirect("/paths?welcome=advanced")
  }
}
