import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import prisma from "@/utils/lib/prismaClient"
import { Cat } from "lucide-react"
import { saveGithubUsername } from "@/app/actions/progress"
import { SubmitButton } from "@/components/usernameButton"

export default async function SettingsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const profile = await prisma.userProfile.findUnique({
    where: { userId: user.id }
  })

  const resolvedParams = await searchParams
  const saved = resolvedParams?.saved === "true"

  return (
    <main className="flex-1 p-8 md:p-12">
      <div className="max-w-xl">
        <h1 className="text-2xl font-black text-white mb-2">Settings</h1>
        <p className="text-slate-400 text-sm mb-10">Manage your account details</p>

        {/* GitHub Username */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cat size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-bold text-white">GitHub Username</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Required to verify your work before completing tasks
              </p>
            </div>
          </div>

          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 text-sm font-medium">GitHub username saved successfully.</p>
            </div>
          )}

          <form action={saveGithubUsername} className="flex flex-col gap-4">
            <input
              type="text"
              name="githubUsername"
              defaultValue={profile?.githubUsername ?? ""}
              placeholder="your-github-username"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-slate-500"
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  )
}