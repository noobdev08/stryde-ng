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
        <main className="min-h-screen bg-[var(--background)] text-white pb-20">
            <StagePageClient stageName={stage.name} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16">

                {/* Back Button */}
                <Link href={`/paths/${id}`} className="inline-block mb-6 sm:mb-8 text-slate-500 hover:text-white transition-colors flex items-center gap-2 group w-fit">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Back to Track</span>
                </Link>

                {/* Header */}
                <div className="mb-8 sm:mb-10">
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
                                    <span className="text-sm font-bold text-blue-400">{stage.progressPercent}%</span>
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
                                                    w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                                                    ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : isCurrent ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'}
                                                `}
                                                >
                                                    {isCompleted ? <CircleCheck size={24} /> : isLocked ? <Lock size={24} /> : <div className="text-lg font-bold">{index + 1}</div>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className={`
                                                        font-semibold text-base md:text-lg
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
                                                    <span className="text-emerald-400 text-xs font-black uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
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
                                                    <span className="text-slate-500 text-xs font-black uppercase tracking-widest px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
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
