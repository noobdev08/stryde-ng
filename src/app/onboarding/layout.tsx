import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect } from "next/navigation"

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  })

  if (userProfile?.hasCompletedOnboarding) {
    redirect("/dashboard")
  }

  return children
}
