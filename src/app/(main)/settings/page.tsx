import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import prisma from "@/utils/lib/prismaClient"
import { Cat, LogOut, Save, User, Bell, Shield } from "lucide-react"
import { saveGithubUsername } from "@/app/actions/progress"
import { logout } from "@/app/(auth)/actions"
import { Card } from "@/components/Card"
import { SectionHeader } from "@/components/SectionHeader"

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
    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="Settings"
          subtitle="Manage your account and preferences"
        />

        <div className="space-y-6">
          {/* GitHub Integration */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <Cat size={24} className="text-slate-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">GitHub Integration</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Required to verify your work before completing tasks
                </p>
              </div>
            </div>

            {saved && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
                <div className="text-emerald-400">✓</div>
                <p className="text-emerald-300 text-sm font-medium">GitHub username saved successfully!</p>
              </div>
            )}

            <form action={saveGithubUsername} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="githubUsername" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  GitHub Username
                </label>
                <input
                  id="githubUsername"
                  type="text"
                  name="githubUsername"
                  defaultValue={profile?.githubUsername ?? ""}
                  placeholder="your-github-username"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Username
              </button>
            </form>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <User size={24} className="text-slate-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Account</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Manage your account information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-slate-400 text-sm">
                    {user.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Name
                  </label>
                  <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-3.5 text-slate-400 text-sm">
                    {user.user_metadata?.name || "User"}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <Bell size={24} className="text-slate-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Notifications</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Control your notification preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                <div>
                  <p className="text-sm font-medium text-white">Email Notifications</p>
                  <p className="text-xs text-slate-500">Receive updates about your progress</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-white">In-App Alerts</p>
                  <p className="text-xs text-slate-500">Get notified about new challenges</p>
                </div>
                <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6 md:p-8 border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <Shield size={24} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Account Actions</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Manage your account security and access
                </p>
              </div>
            </div>

            <form action={logout} className="mb-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </form>

            <p className="text-xs text-slate-600 text-center">
              Make sure your work is pushed to GitHub before signing out
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
