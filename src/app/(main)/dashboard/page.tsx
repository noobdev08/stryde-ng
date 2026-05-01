import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PathCard from '@/components/PathCard'
import { FlameKindling, Sparkles, Monitor, Layout, Database, Rocket } from "lucide-react"
import prisma from '@/utils/lib/prismaClient'

export default async function DashboardPage() {
  const supabase = await createClient() //
  const { data: { user } } = await supabase.auth.getUser() //

  if (!user) redirect('/login') //

  // 1. Fetch all Paths with nested Stages and Tasks, 
  // including the user's progress for each task.
  const paths = await prisma.path.findMany({
    include: {
      stages: {
        include: {
          tasks: {
            include: {
              userProgress: {
                where: { userId: user.id }
              }
            }
          }
        }
      }
    },
    orderBy: { order: 'asc' }
  })

  // 2. Calculate Progress for each path
  const pathsWithProgress = paths.map(path => {
    const allTasks = path.stages.flatMap(s => s.tasks)
    const completedTasks = allTasks.filter(t => t.userProgress.length > 0)
    const progressPercent = allTasks.length > 0
      ? Math.round((completedTasks.length / allTasks.length) * 100)
      : 0

    return { ...path, progressPercent, totalTasks: allTasks.length, completedCount: completedTasks.length }
  })

  // 3. Find the "Continue Learning" task
  // Logic: Find the first incomplete task in the first unlocked path
  const activePath = pathsWithProgress.find(p => p.progressPercent < 100 && !p.isLocked) || pathsWithProgress[0]
  const nextTask = activePath?.stages
    .flatMap(s => s.tasks.map(t => ({ ...t, stageName: s.name })))
    .find(t => t.userProgress.length === 0)

  return (
    <main className="flex-1 p-8 md:p-12 overflow-y-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className='flex flex-col gap-1'>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            Welcome back, {user.user_metadata?.name || "Developer"}
            <Sparkles size={20} className="text-blue-400 animate-pulse shrink-0" />
          </h1>
          <p className="text-sm text-gray-400">Let&apos;s continue your journey</p>
        </div>

        {/* Streak - Currently hardcoded in your UI, but can be derived from UserProgress dates later */}
        <div className="self-start md:self-auto bg-[#0f172a] border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-3">
          <FlameKindling size={18} className="text-orange-500 fill-orange-500/20" />
          <div className="flex flex-row md:flex-col items-center gap-2 md:gap-0 leading-none">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Streak</span>
            <span className="text-lg font-bold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Continue Learning - Hero Card */}
      <section className='mt-5'>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Continue Learning</h2>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-2xl">
          <div className="flex items-center gap-4 md:gap-8 w-full">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
              <Monitor size={28} className="text-blue-400" />
            </div>

            <div className="flex-1 z-10">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {nextTask?.title || "All Caught Up!"}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium">
                {nextTask ? `${nextTask.stageName}` : "Check back later for new tasks"}
              </p>
            </div>
          </div>

          <div className="w-full md:max-w-md z-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
              <span className="text-blue-400">{activePath?.progressPercent || 0}% Complete</span>
            </div>
            <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-700"
                style={{ width: `${activePath?.progressPercent || 0}%` }}
              />
            </div>
          </div>

          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all cursor-pointer z-10">
            Continue
          </button>
        </div>
      </section>

      {/* Your Paths - Dynamic Grid */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className={path.progressPercent > 0 ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : ""}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Tasks Completed</p>
            <p className="text-2xl font-bold text-white">
              {pathsWithProgress.reduce((acc, curr) => acc + curr.completedCount, 0)}
            </p>
          </div>
          {/* Add other stats like Streak and Time here */}
        </div>
      </section>
    </main>
  )
}

