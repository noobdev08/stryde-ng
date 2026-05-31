import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PathCard from '@/components/PathCard'
import { Sparkles, Monitor, Layout, Database, Rocket, CheckCircle, Flame, TrendingUp, Target } from 'lucide-react'
import Link from 'next/link'
import { getAllPathsWithProgress } from '@/utils/lib/pathQueries'
import { calculatePathProgress } from '@/utils/lib/progressCalculator'
import { ProgressBar } from '@/components/ProgressBar'
import { calculateStreak, getStreakIconCount } from '@/utils/lib/streak'
import { InteractiveOnboarding } from '@/components/InteractiveOnboarding'
import { Card } from '@/components/Card'
import { StatCard } from '@/components/StatCard'
import { SectionHeader } from '@/components/SectionHeader'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const streak = await calculateStreak(user.id)

  const paths = await getAllPathsWithProgress(user.id)

  const pathsWithProgress = paths.map(path => {
    const { progressPercent, totalCount, completedCount } = calculatePathProgress(path.stages)
    return { ...path, progressPercent, totalCount, completedCount }
  })

  const activePath = pathsWithProgress.find(p => p.progressPercent < 100 && !p.isLocked) || pathsWithProgress[0]
  const nextTask = activePath?.stages
    .flatMap(s => s.tasks.map(t => ({ ...t, stageName: s.name, stageId: s.id })))
    .find(t => t.userProgress.length === 0)

  const totalCompleted = pathsWithProgress.reduce((acc, curr) => acc + curr.completedCount, 0)
  const startedPaths = pathsWithProgress.filter(p => p.progressPercent > 0).length
  const completedPaths = pathsWithProgress.filter(p => p.progressPercent === 100).length

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className='space-y-2'>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 text-white tracking-tight">
              Welcome back, {user.user_metadata?.name || "Developer"}
              <Sparkles size={24} className="text-blue-400 animate-pulse shrink-0 hidden md:inline" />
            </h1>
            <p className="text-sm sm:text-base text-slate-400">Keep building momentum and crush your goals!</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/30 px-5 py-4 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
            <div className="flex items-center gap-1">
              {Array.from({ length: getStreakIconCount(streak) }).map((_, i) => (
                <Flame key={i} size={32} className="text-orange-400" fill="currentColor" />
              ))}
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-black tracking-widest">Current Streak</p>
              <p className="text-3xl font-black text-orange-400">{streak} <span className="text-lg font-semibold text-orange-400/70">{streak === 1 ? 'day' : 'days'}</span></p>
            </div>
          </div>
        </div>

        {/* Interactive Onboarding for new users */}
        <InteractiveOnboarding 
          userName={user.user_metadata?.name || "Developer"} 
          completedCount={totalCompleted} 
        />

        {/* Continue Learning - Hero Card */}
        {nextTask && (
          <section>
            <SectionHeader
              title="Continue Learning"
              subtitle="Pick up right where you left off"
            />
            <Card className="hoverable">
              <div className="relative overflow-hidden p-6 md:p-8">
                <div className="absolute -right-24 -top-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center shrink-0">
                      <Monitor size={32} className="text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight line-clamp-2 mb-1">
                        {nextTask?.title || "All Caught Up!"}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium line-clamp-1">
                        {nextTask ? `${nextTask.stageName}` : "Check back later for new tasks"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-64 shrink-0">
                    <ProgressBar percentage={activePath?.progressPercent || 0} label size="lg" />
                  </div>

                  <Link
                    href={nextTask ? `/paths/${activePath?.id}/${nextTask.stageId}/${nextTask.id}` : '#'}
                    className="w-full lg:w-auto shrink-0"
                  >
                    <button
                      className={`w-full lg:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] ${!nextTask && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!nextTask}
                    >
                      {nextTask ? 'Continue →' : 'All Set! 🎉'}
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Your Stats */}
        <section>
          <SectionHeader
            title="Your Stats"
            subtitle="Track your progress over time"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Tasks Completed"
              value={totalCompleted}
              color="blue"
              icon={<CheckCircle size={20} className="text-blue-400" />}
            />
            <StatCard
              title="Current Streak"
              value={streak}
              color="orange"
              suffix={streak === 1 ? 'day' : 'days'}
              icon={<Flame size={20} className="text-orange-400" />}
            />
            <StatCard
              title="Paths Started"
              value={startedPaths}
              color="emerald"
              icon={<TrendingUp size={20} className="text-emerald-400" />}
            />
            <StatCard
              title="Paths Completed"
              value={completedPaths}
              color="purple"
              icon={<Target size={20} className="text-purple-400" />}
            />
          </div>
        </section>

        {/* Your Learning Paths */}
        <section>
          <SectionHeader
            title="Your Learning Paths"
            subtitle="Choose your next adventure"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
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
                totalCount={path.totalCount}
                className={path.progressPercent > 0 ? "border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]" : ""}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
