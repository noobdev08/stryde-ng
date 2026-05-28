import { createClient } from "@/utils/supabase/server"
import { getPathWithProgress } from "../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { CheckCircle2, Lock, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import StageList from "@/components/StageList"
import { type Plan } from "@/utils/lib/plans"
import { ProgressBar } from "@/components/ProgressBar"

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

  return (
    <main className="min-h-screen bg-[var(--background)] text-slate-200 pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">

        {/* Simplified Navigation */}
        <Link
          href="/paths"
          className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-colors group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">All Tracks</span>
        </Link>

        {/* Hero Header - Refined Typography */}
        <header className="mb-12 border-b border-slate-900 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {path.name}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            {path.description}
          </p>
        </header>

        {/* Progress Section - Sleeker and less "bulky" */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Overall Completion
              </span>
              <span className="text-sm font-bold text-blue-400">{path.progressPercent}%</span>
            </div>
            <ProgressBar percentage={path.progressPercent} />
          </div>

          <div className="bg-[#0f172a]/40 border border-slate-800/50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-white">{clearedStages} / {path.stages.length}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Stages Cleared</div>
          </div>
        </section>

        {/* Execution Pipeline */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
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