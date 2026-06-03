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

  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      level,
      hasCompletedOnboarding: true
    },
    create: {
      userId: user.id,
      level,
      hasCompletedOnboarding: true
    }
  })

  if (level === "beginner") {
    redirect("/dashboard")
  } else if (level === "intermediate") {
    redirect("/paths/cmpx9nx5e00013ougpkjjyziu/cmpx9nzju000e3ougi9ldnejk/cmpx9o09f000k3ougtklz58i8")
  } else if (level === "advanced") {
    redirect("/paths?welcome=advanced")
  }
}
