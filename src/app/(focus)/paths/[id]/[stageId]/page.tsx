import { createClient } from "@/utils/supabase/server"
import { getStageWithProgress } from "../../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, CircleCheck, Lock } from "lucide-react"
import Link from "next/link"
import { ActionButton } from "@/components/ActionButton"
import { ProgressBar } from "@/components/ProgressBar"
import { Card } from "@/components/Card"
import { StatCard } from "@/components/StatCard"
import StagePageClient from "./StagePageClient"

export default async function StagePage({
    params
}: {
    params: Promise<{ id: string; stageId: string }>
}) {
    const { id, stageId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const stage = await getStageWithProgress(stageId, user.id)
    if (!stage) notFound()

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
            <div className="fixed inset-0 pointer-events-none">
                <div className="grid-bg absolute inset-0" />
                <div className="animate-float absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/8 blur-[140px] rounded-full" />
                <div className="animate-float absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/8 blur-[140px] rounded-full" />
            </div>
            <StagePageClient stageName={stage.name} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16 relative z-10">

                {/* Back Button */}
                <Link href={`/paths/${id}`} className="text-slate-500 hover:text-white transition-colors inline-flex items-center gap-2 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-black uppercase tracking-widest">Back to Stage</span>
                </Link>

                {/* Header */}
                <div className="mb-8 sm:mb-10 mt-5">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3">{stage.name}</h1>
                    <p className="text-xs sm:text-sm md:text-lg text-slate-400">{stage.description || "Complete all tasks to master this stage."}</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 sm:mb-12">
                    <Card className="p-5 md:p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Stage Progress</span>
                                    <span className="text-sm font-black text-blue-400">{stage.progressPercent}%</span>
                                </div>
                                <ProgressBar percentage={stage.progressPercent} />
                            </div>
                        </div>
                    </Card>
                    <StatCard
                        title="Tasks Completed"
                        value={`${stage.completedCount} / ${stage.tasks.length}`}
                        color="blue"
                        icon={<CheckCircle2 size={20} />}
                    />
                </div>

                {/* Tasks List */}
                <section>
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Tasks</h2>

                    <div className="space-y-3">
                        {stage.tasks.map((task, index) => {
                            const isCompleted = task.userProgress.length > 0

                            // Task is "Current" if it's not completed AND (it's the first task OR the previous task is completed)
                            const previousTask = stage.tasks[index - 1]
                            const isCurrent = !isCompleted && (index === 0 || previousTask?.userProgress.length > 0)
                            const isLocked = !isCompleted && !isCurrent

                            return (
                                <div
                                    key={task.id}
                                    className={`
                                        ${isLocked ? 'opacity-60' : ''}
                                    `}
                                >
                                    <Card className={`
                                        p-5 md:p-6 ${isCompleted ? "border-emerald-500/20 bg-emerald-500/5" : isCurrent ? "border-blue-500/20 bg-blue-500/5" : ""} ${!isLocked ? "hoverable" : ""}
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className={`
                                                    w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                                                    ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : isCurrent ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-800/50 text-slate-500 border border-slate-800'}
                                                `}
                                                >
                                                    {isCompleted ? <CircleCheck size={24} /> : isLocked ? <Lock size={24} /> : <div className="text-lg font-black">{index + 1}</div>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className={`
                                                        font-black text-base md:text-lg
                                                        ${isLocked ? 'text-slate-500' : isCompleted ? 'text-emerald-200' : 'text-white'}
                                                        `}
                                                    >
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status Button/Label */}
                                            <div>
                                                {isCompleted ? (
                                                    <span className="text-emerald-400 text-xs font-black uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                                        Completed
                                                    </span>
                                                ) : isCurrent ? (
                                                    <ActionButton
                                                        variant="navigate"
                                                        text="Start"
                                                        href={`/paths/${id}/${stageId}/${task.id}`}
                                                        size="sm"
                                                        loadingText="Loading"
                                                    />
                                                ) : (
                                                    <span className="text-slate-500 text-xs font-black uppercase tracking-widest px-4 py-2 bg-slate-800 rounded-2xl border border-slate-800">
                                                        Locked
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}
