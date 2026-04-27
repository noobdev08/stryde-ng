import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/paths`, {
    cache: 'no-store'
  })
  const { data: paths } = await res.json()

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hey, {user.user_metadata?.name || 'Developer'} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">Pick a path. Start executing.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-bold text-orange-400">🔥 0</p>
            <p className="text-xs text-slate-500">day streak</p>
          </div>
        </div>

        {/* Paths */}
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Learning Paths
        </h2>
        <div className="grid gap-4">
          {paths?.map((path: any) => (
            path.isLocked ? (
              <div
                key={path.id}
                className="block p-6 rounded-2xl border bg-slate-900 border-slate-800 opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">{path.name}</h3>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                        🔒 Locked
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{path.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={path.id}
                href={`/paths/${path.id}`}
                className="block p-6 rounded-2xl border bg-slate-900 border-slate-700 hover:border-blue-500 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">{path.name}</h3>
                    </div>
                    <p className="text-slate-500 text-sm">{path.description}</p>
                  </div>
                  <span className="text-blue-400 text-xl">→</span>
                </div>
              </Link>
            )
          ))}
        </div>

      </div>
    </main>
  )
}