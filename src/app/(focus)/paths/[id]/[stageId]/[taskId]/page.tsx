import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Video, BookOpen, Cat, AlertCircle, CircleCheck } from "lucide-react"
import Link from "next/link"
import { completeTask } from "../../../../../actions/progress"
import { ActionButton } from "@/components/ActionButton"
import { Card } from "@/components/Card"

export default async function TaskPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string; stageId: string; taskId: string }>
  searchParams: Promise<{ error?: string; repo?: string; username?: string }>
}) {
  const { id, stageId, taskId } = await params
  const { error } = await searchParams

  const resolvedSearchParams = await searchParams
  const errorMessage = resolvedSearchParams?.error
    ? decodeURIComponent(resolvedSearchParams.error)
    : null

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      stage: {
        include: {
          tasks: { orderBy: { order: "asc" } }
        }
      },
      userProgress: { where: { userId: user.id } }
    }
  })

  if (!task) notFound()

  const isCompleted = task.userProgress.length > 0
  const taskNumber = task.stage.tasks.findIndex(t => t.id === taskId) + 1
  const totalTasks = task.stage.tasks.length
  const hasResources = task.resourceUrl || task.youtubeUrl

  const conceptParagraphs = task.concept
    ? task.concept
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .reduce<string[]>((acc, para, i) => {
        const groupIndex = Math.floor(i / 3)
        if (!acc[groupIndex]) acc[groupIndex] = para
        else acc[groupIndex] += " " + para
        return acc
      }, [])
    : []

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16 pb-20">

        {/* Back */}
        <div className="mb-12">
          <Link href={`/paths/${id}/${stageId}`} className="text-slate-500 hover:text-white transition-colors inline-flex items-center gap-2 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold uppercase tracking-wider">Back to Stage</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center shrink-0
              ${isCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}
            `}
            >
              {isCompleted ? <CircleCheck size={24} /> : <div className="text-lg font-bold">{taskNumber}</div>}
            </div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Task {taskNumber} of {totalTasks}
            </p>
            {isCompleted && (
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
            {task.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Concept */}
        {conceptParagraphs.length > 0 && (
          <div className="mb-14">
            <Card className="p-6 md:p-8">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                The Concept
              </p>
              <div className="flex flex-col gap-4">
                {conceptParagraphs.map((para, i) => (
                  <p key={i} className="text-slate-300 text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Instruction */}
        {task.instruction && (
          <div className="mb-14">
            <Card className="p-6 md:p-8 border-blue-500/20">
              <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6">
                Your Task
              </p>
              <p className="text-white text-base leading-relaxed whitespace-pre-line">
                {task.instruction}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
                <Cat size={16} className="text-slate-500 shrink-0" />
                <p className="text-slate-500 text-sm">
                  Push your work to GitHub before marking this complete. We will verify your repo exists.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Resources */}
        {hasResources && (
          <div className="mb-14">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              Dive Deeper
            </p>
            <div className="flex flex-col gap-3">
              {task.resourceUrl && (
                <Link
                  href={task.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <BookOpen size={20} className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-base">MDN Documentation</span>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
              {task.youtubeUrl && (
                <Link
                  href={task.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <Video size={20} className="text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-base">Watch on YouTube</span>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-red-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="mb-6 p-4 md:p-5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Complete */}
        <div className="border-t border-slate-900 pt-10">
          <h3 className="text-xs font-black text-slate-200 mb-2 uppercase tracking-widest">
            Mark as Complete
          </h3>
          <p className="text-slate-500 text-sm mb-8">
            Push your work to GitHub first. We will check your repo before marking this done.
          </p>
          <form action={completeTask}>
            <input type="hidden" name="taskId" value={taskId} />
            <input type="hidden" name="stageId" value={stageId} />
            <input type="hidden" name="pathId" value={id} />
            <ActionButton
              variant="submit"
              label="Complete Task"
              completed={isCompleted}
              loadingText="Completing..."
              showCheckIcon
              size="lg"
            />
          </form>
        </div>

      </div>
    </main>
  )
}
