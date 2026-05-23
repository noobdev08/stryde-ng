import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Video, BookOpen, Cat, AlertCircle } from "lucide-react"
import Link from "next/link"
import { completeTask } from "../../../../../actions/progress"
import StageButton from "../../../../../../components/StageButton"

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
      .reduce<string[]>((acc, sentence, i) => {
        const groupIndex = Math.floor(i / 3)
        if (!acc[groupIndex]) acc[groupIndex] = sentence
        else acc[groupIndex] += " " + sentence
        return acc
      }, [])
    : []

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <div className="max-w-3xl mx-auto px-8 pt-12 pb-20">

        {/* Back */}
        <div className="mb-12">
          <Link href={`/paths/${id}/${stageId}`} className="text-slate-500 hover:text-white transition-colors inline-block">
            <ArrowLeft size={24} />
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Task {taskNumber} of {totalTasks}
          </p>
          <h1 className="text-5xl font-black leading-tight mb-6">
            {task.title}
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Concept */}
        {conceptParagraphs.length > 0 && (
          <div className="mb-14 p-8 rounded-2xl bg-[#0f172a] border border-slate-800">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
              The concept
            </p>
            <div className="flex flex-col gap-5">
              {conceptParagraphs.map((para, i) => (
                <p key={i} className="text-slate-300 text-base leading-[1.85]">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Instruction */}
        {task.instruction && (
          <div className="mb-14 p-8 rounded-2xl bg-[#0f172a] border border-blue-500/20">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">
              Your task
            </p>
            {/* The fix is the whitespace-pre-line class below */}
            <p className="text-white text-base leading-[1.85] whitespace-pre-line">
              {task.instruction}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
              <Cat size={15} className="text-slate-500 shrink-0" />
              <p className="text-slate-500 text-xs">
                Push your work to GitHub before marking this complete. We will verify your repo exists.
              </p>
            </div>
          </div>
        )}

        {/* Resources */}
        {hasResources && (
          <div className="mb-14">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              Dive deeper
            </p>
            <div className="flex flex-col gap-3">
              {task.resourceUrl && (
                <Link
                  href={task.resourceUrl}
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <BookOpen size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">MDN Docs</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
              {task.youtubeUrl && (
                <Link
                  href={task.youtubeUrl}
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <Video size={18} className="text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">Watch on YouTube</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-red-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Complete */}
        <div className="border-t border-slate-900 pt-10">
          <h3 className="text-xs font-black text-slate-200 mb-2 uppercase tracking-widest">
            Mark as complete
          </h3>
          <p className="text-slate-500 text-sm mb-8">
            Push your work to GitHub first. We will check your repo before marking this done.
          </p>
          <form action={completeTask}>
            <input type="hidden" name="taskId" value={taskId} />
            <input type="hidden" name="stageId" value={stageId} />
            <input type="hidden" name="pathId" value={id} />
            <StageButton label="Complete Task" completed={isCompleted} />
          </form>
        </div>

      </div>
    </main>
  )
}