import { createClient } from "@/utils/supabase/server"
import { getPathWithProgress } from "../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { CheckCircle2, Lock, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import StageList from "@/components/StageList"
import { type Plan } from "@/utils/lib/plans"

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect("/login")

  const path = await getPathWithProgress(id, user.id)
  if (!path) notFound()

  return (
    <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24">

        {/* Navigation - Much cleaner without sidebar */}
        <Link
          href="/paths"
          className="flex items-center gap-2 text-slate-500 hover:text-blue-400 mb-12 transition-all group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Tracks</span>
        </Link>

        {/* Hero Header - Added spacing and bold typography */}
        <header className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            {path.name}
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            {path.description}
          </p>
        </header>

        {/* Progress Card - Fixed Width and Aspect Ratio */}
        <section className="mb-20 bg-gradient-to-br from-[#0f172a] to-[#020617] border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">System Progress</span>
                <div className="text-5xl font-black text-white mt-2">{path.progressPercent}%</div>
              </div>
              <div className="text-slate-500 text-sm font-bold bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                {path.stages.filter(s => s.tasks.length > 0 && s.tasks.every(t => t.userProgress.length > 0)).length} / {path.stages.length} Stages Clear
              </div>
            </div>

            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-1 border border-slate-800">
              <div
                className="h-full bg-blue-600 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-1000 ease-out"
                style={{ width: `${path.progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* Curriculum Stages - Increased spacing between cards */}
        <section className="space-y-6">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 ml-2">
            Execution Pipeline
          </h2>
          <StageList
            stages={path.stages}
            pathId={id}
            userPlan={"free" as Plan}
          />
        </section>
      </div>
    </main>
  )
}