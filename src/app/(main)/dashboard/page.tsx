import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PathCard from '@/components/PathCard'
import { Sparkles, Monitor, Layout, Database, Rocket } from "lucide-react"
import prisma from '@/utils/lib/prismaClient'
import Link from 'next/link'
import { getAllPathsWithProgress } from '@/utils/lib/pathQueries'
import { calculatePathProgress } from '@/utils/lib/progressCalculator'
import { ProgressBar } from '@/components/ProgressBar'
import { calculateStreak, getStreakEmoji } from '@/utils/lib/streak'
import { OnboardingBanner } from '@/components/OnboardingBanner'

export default async function DashboardPage() {
  const supabase = await createClient() //
  const { data: { user } } = await supabase.auth.getUser() //

  if (!user) redirect('/login') //

  // Calculate streak
  const streak = await calculateStreak(user.id)

  // 1. Fetch all Paths with nested Stages and Tasks
  const paths = await getAllPathsWithProgress(user.id)

  // 2. Calculate Progress for each path
  const pathsWithProgress = paths.map(path => {
    const { progressPercent, totalCount, completedCount } = calculatePathProgress(path.stages)
    return { ...path, progressPercent, totalTasks: totalCount, completedCount }
  })

  // 3. Find the "Continue Learning" task
  // Logic: Find the first incomplete task in the first unlocked path
  const activePath = pathsWithProgress.find(p => p.progressPercent < 100 && !p.isLocked) || pathsWithProgress[0]
  const nextTask = activePath?.stages
    .flatMap(s => s.tasks.map(t => ({ ...t, stageName: s.name, stageId: s.id })))
    .find(t => t.userProgress.length === 0)

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 md:mb-8">
        <div className='flex flex-col gap-1'>
          <h1 className="text-lg md:text-2xl font-black flex items-center gap-2 text-white">
            Welcome, {user.user_metadata?.name || "Developer"}
            <Sparkles size={20} className="text-blue-400 animate-pulse shrink-0 hidden md:block" />
          </h1>
          <p className="text-xs md:text-sm text-slate-400">Keep learning and building</p>
        </div>

        {/* Streak Badge - Mobile & Desktop */}
        <div className="bg-slate-900/40 border border-slate-700/40 px-4 md:px-5 py-3 rounded-lg md:rounded-xl flex items-center gap-3 hover:border-orange-500/30 transition-all w-fit">
          <div className="text-2xl md:text-3xl">{getStreakEmoji(streak)}</div>
          <div>
            <p className="text-[10px] md:text-xs text-slate-500 uppercase font-black tracking-wider">Streak</p>
            <p className="text-lg md:text-xl font-black text-orange-500">{streak} {streak === 1 ? 'day' : 'days'}</p>
          </div>
        </div>
      </div>

      {/* Onboarding Banner for new users */}
      <OnboardingBanner userName={user.user_metadata?.name || "Developer"} completedCount={pathsWithProgress.reduce((acc, curr) => acc + curr.completedCount, 0)} />

      {/* Continue Learning - Hero Card */}
      {nextTask && (
        <section className='mb-6 md:mb-8'>
          <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Continue Learning</h2>
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/40 rounded-lg md:rounded-2xl p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 shadow-lg hover:border-blue-500/20 transition-all">
            <div className="flex items-center gap-3 md:gap-8 w-full">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600/10 border border-blue-500/20 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                <Monitor size={24} className="text-blue-400" />
              </div>

              <div className="flex-1 z-10 min-w-0">
                <h3 className="text-base md:text-xl font-black text-white tracking-tight line-clamp-2">
                  {nextTask?.title || "All Caught Up!"}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 font-medium line-clamp-1">
                  {nextTask ? `${nextTask.stageName}` : "Check back later for new tasks"}
                </p>
              </div>
            </div>

            <div className="w-full md:max-w-sm z-10">
              <ProgressBar percentage={activePath?.progressPercent || 0} label size="md" />
            </div>

            <Link
              href={nextTask ? `/paths/${activePath?.id}/${nextTask.stageId}/${nextTask.id}` : '#'}
              className="w-full md:w-auto z-10"
            >
              <button
                className={`w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold transition-all cursor-pointer ${!nextTask && 'opacity-50 cursor-not-allowed'}`}
                disabled={!nextTask}
              >
                {nextTask ? 'Continue →' : 'All Set! 🎉'}
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Your Paths - Dynamic Grid */}
      <section className='mb-6 md:mb-8'>
        <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Your Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {pathsWithProgress.map((path) => (
            <PathCard
              key={path.id}
              id={path.id}
              title={path.name}
              description={path.description || ""}
              icon={
                path.name.includes("Frontend") ? <Layout size={24} className="text-blue-400" /> :
                  path.name.includes("Backend") ? <Database size={24} className="text-blue-400" /> :
                    <Rocket size={24} className="text-blue-400" />
              }
              progress={path.progressPercent}
              isLocked={path.isLocked}
              completedCount={path.completedCount}
              totalCount={path.totalTasks}
              className={path.progressPercent > 0 ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : ""}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='mb-6 md:mb-8'>
        <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-slate-900/40 border border-slate-700/40 p-4 md:p-5 rounded-lg hover:border-blue-500/20 transition-all">
            <p className="text-xs md:text-sm text-slate-500 font-medium mb-2">Tasks Completed</p>
            <p className="text-2xl md:text-3xl font-black text-blue-400">
              {pathsWithProgress.reduce((acc, curr) => acc + curr.completedCount, 0)}
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/40 p-4 md:p-5 rounded-lg hover:border-orange-500/20 transition-all">
            <p className="text-xs md:text-sm text-slate-500 font-medium mb-2">Current Streak</p>
            <p className="text-2xl md:text-3xl font-black text-orange-400 flex items-center gap-2">
              {streak}
              <span className="text-lg md:text-xl">{getStreakEmoji(streak)}</span>
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/40 p-4 md:p-5 rounded-lg hover:border-emerald-500/20 transition-all">
            <p className="text-xs md:text-sm text-slate-500 font-medium mb-2">Paths Started</p>
            <p className="text-2xl md:text-3xl font-black text-emerald-400">
              {pathsWithProgress.filter(p => p.progressPercent > 0).length}
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/40 p-4 md:p-5 rounded-lg hover:border-purple-500/20 transition-all">
            <p className="text-xs md:text-sm text-slate-500 font-medium mb-2">Paths Completed</p>
            <p className="text-2xl md:text-3xl font-black text-purple-400">
              {pathsWithProgress.filter(p => p.progressPercent === 100).length}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}