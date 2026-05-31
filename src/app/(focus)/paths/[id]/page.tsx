import { createClient } from "@/utils/supabase/server"
import { getPathWithProgress } from "../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { CheckCircle2, ArrowLeft, Target } from "lucide-react"
import Link from "next/link"
import StageList from "@/components/StageList"
import { type Plan } from "@/utils/lib/plans"
import { ProgressBar } from "@/components/ProgressBar"
import { Card } from "@/components/Card"
import { StatCard } from "@/components/StatCard"

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const path = await getPathWithProgress(id, user.id)
  if (!path) notFound()

  // Pre-calculate count for cleaner JSX
  const clearedStages = path.stages.filter(s =>
    s.tasks.length > 0 && s.tasks.every(t => t.userProgress.length > 0)
  ).length

  const totalTasks = path.stages.reduce((acc, s) => acc + s.tasks.length, 0)
  const completedTasks = path.stages.reduce((acc, s) => acc + s.tasks.filter(t => t.userProgress.length > 0).length, 0)

  return (
    <main className="min-h-screen bg-[var(--background)] text-slate-200 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16">

        {/* Simplified Navigation */}
        <Link
          href="/paths"
          className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 sm:mb-10 transition-colors group w-fit"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold uppercase tracking-wider">Back to Tracks</span>
        </Link>

        {/* Hero Header */}
        <header className="mb-10 sm:mb-12 border-b border-slate-900 pb-8 sm:pb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
            {path.name}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            {path.description}
          </p>
        </header>

        {/* Stats Grid */}
        <section className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title="Overall Completion"
            value={`${path.progressPercent}%`}
            color="blue"
            icon={<Target size={20} />}
          />
          <StatCard
            title="Stages Cleared"
            value={`${clearedStages} / ${path.stages.length}`}
            color="emerald"
            icon={<CheckCircle2 size={20} />}
          />
          <StatCard
            title="Tasks Completed"
            value={`${completedTasks} / ${totalTasks}`}
            color="purple"
            icon={<CheckCircle2 size={20} />}
          />
        </section>

        {/* Detailed Progress Bar */}
        <section className="mb-12 sm:mb-16">
          <Card className="p-6 md:p-8">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-blue-400">{path.progressPercent}%</span>
            </div>
            <ProgressBar percentage={path.progressPercent} size="lg" />
          </Card>
        </section>

        {/* Execution Pipeline */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
              Execution Pipeline
            </h2>
            <div className="h-[1px] w-full bg-slate-900" />
          </div>

          <StageList
            stages={path.stages}
            pathId={id}
            userPlan={"free" as Plan} // Consider fetching actual user plan here
          />
        </section>
      </div>
    </main>
  )
}
