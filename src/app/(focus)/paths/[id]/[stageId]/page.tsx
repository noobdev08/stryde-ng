import { createClient } from "@/utils/supabase/server"
import { getStageWithProgress } from "../../../../../utils/lib/paths"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { TaskStartButton } from "@/components/TaskStartBtn"

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
            <div className="max-w-4xl mx-auto px-6 pt-12">

                {/* Back Button */}
                <Link href={`/paths/${id}`} className="inline-block mb-8 text-slate-500 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black mb-3">{stage.name}</h1>
                    <p className="text-slate-400 text-lg">Learn the structure of the web with HTML.</p>
                </div>

                {/* Mini Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</span>
                        <div className="text-right">
                            <span className="block text-xs font-bold text-slate-300">{stage.completedCount} / {stage.tasks.length} tasks</span>
                            <span className="text-[10px] text-slate-500">{stage.progressPercent}%</span>
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-700"
                            style={{ width: `${stage.progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Tasks</h2>

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
                  flex items-center justify-between p-5 rounded-xl border transition-all
                  ${isLocked ? 'bg-slate-900/20 border-slate-900/50 opacity-50' : 'bg-[#0f172a] border-slate-800'}
                `}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${isCompleted ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-600'}
                  `}>
                                        {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                                    </div>
                                    <span className={`font-medium ${isLocked ? 'text-slate-500' : 'text-slate-200'}`}>
                                        {task.title}
                                    </span>
                                </div>

                                {/* Status Button/Label */}
                                <div>
                                    {isCompleted ? (
                                        <span className="text-emerald-500 text-xs font-black uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 cursor-pointer">
                                            Completed
                                        </span>
                                    ) : isCurrent ? (
                                        <TaskStartButton href={`/paths/${id}/${stageId}/${task.id}`} />
                                    ) : (
                                        <span className="text-slate-600 text-xs font-black uppercase tracking-widest px-4 py-2 bg-slate-900 rounded-lg border border-transparent">
                                            Locked
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}