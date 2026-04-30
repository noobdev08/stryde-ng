import { createClient } from "@/utils/supabase/server"
import { getPathWithProgress } from "../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { CheckCircle2, Lock, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

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
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 ml-2">Execution Pipeline</h2>
          
          {path.stages.map((stage, index) => {
            const isCompleted = stage.tasks.length > 0 && stage.tasks.every(t => t.userProgress.length > 0)
            
            // STRICT LOCKING LOGIC
            const previousStage = path.stages[index - 1]
            const isPreviousCompleted = previousStage 
              ? (previousStage.tasks.length > 0 && previousStage.tasks.every(t => t.userProgress.length > 0))
              : false
            
            // First stage is always open. Others require previous completion.
            const isLocked = index === 0 ? false : !isPreviousCompleted

            return (
              <div key={stage.id} className="relative">
                <Link 
                  href={isLocked ? "#" : `/paths/${id}/${stage.id}`}
                  className={`
                    group flex items-center justify-between p-8 rounded-3xl border transition-all duration-300
                    ${isLocked 
                      ? 'bg-slate-900/20 border-slate-900/50 cursor-not-allowed' 
                      : 'bg-[#0f172a] border-slate-800 hover:border-blue-500/50 hover:bg-[#131c33] cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center gap-8">
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all
                      ${isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-500' 
                        : isLocked ? 'bg-slate-900 text-slate-700' : 'bg-slate-800 text-white'
                      }
                    `}>
                      {isCompleted ? <CheckCircle2 size={28} /> : index + 1}
                    </div>
                    
                    <div>
                      <h3 className={`font-bold text-2xl tracking-tight ${isLocked ? 'text-slate-600' : 'text-white'}`}>
                        {stage.name}
                      </h3>
                      <p className="text-slate-500 font-medium mt-1">{stage.tasks.length} Modules</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {isLocked ? (
                      <Lock size={20} className="text-slate-700" />
                    ) : (
                      <ChevronRight size={24} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}