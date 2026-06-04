import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Video, BookOpen, Cat, AlertCircle, CircleCheck } from "lucide-react"
import Link from "next/link"
import { completeTask } from "../../../../../actions/progress"
import { ActionButton } from "@/components/ActionButton"
import { Card } from "@/components/Card"
import { parseConceptParagraphs, parseInstructions } from "@/utils/lib/contentFormatters"

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

  const conceptParagraphs = parseConceptParagraphs(task.concept || '')
  const instructionSteps = parseInstructions(task.instruction || '')

  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16 pb-20 relative z-10">

        {/* Back */}
        <div className="mb-12">
          <Link href={`/paths/${id}/${stageId}`} className="text-slate-500 hover:text-white transition-colors inline-flex items-center gap-2 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-black uppercase tracking-widest">Back to Stage</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className={`
              w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
              ${isCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}
            `}
            >
              {isCompleted ? <CircleCheck size={24} /> : <div className="text-lg font-black">{taskNumber}</div>}
            </div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Task {taskNumber} of {totalTasks}
            </p>
            {isCompleted && (
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
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
              <div className="space-y-4 mb-6">
                {instructionSteps.length > 0 ? (
                  instructionSteps.map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-blue-400 font-black text-sm">{step.number}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-slate-200 text-base leading-relaxed">
                          {step.text}
                        </p>
                        {step.subItems.length > 0 && (
                          <ul className="mt-3 ml-0 space-y-2">
                            {step.subItems.map((subItem, i) => (
                              <li key={i} className="text-slate-400 text-sm leading-relaxed pl-4 border-l border-slate-800">
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                    {task.instruction}
                  </p>
                )}
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
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all group hover:bg-slate-900/50"
                >
                  <BookOpen size={20} className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span className="font-black text-slate-300 group-hover:text-white transition-colors text-base">MDN Documentation</span>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
              {task.youtubeUrl && (
                <Link
                  href={task.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-all group hover:bg-slate-900/50"
                >
                  <Video size={20} className="text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
                  <span className="font-black text-slate-300 group-hover:text-white transition-colors text-base">Watch on YouTube</span>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-red-400 transition-colors ml-auto shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="mb-6 p-4 md:p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Complete */}
        <div className="border-t border-slate-800 pt-10">
          <h3 className="text-xs font-black text-slate-200 mb-2 uppercase tracking-widest">
            Mark as Complete
          </h3>
          {task.stage.validationType === "repo_exists" && (
            <p className="text-slate-500 text-sm mb-8">
              Push your work to GitHub first. We will check your repo before marking this done.
            </p>
          )}
          <form action={completeTask}>
            <input type="hidden" name="taskId" value={taskId} />
            <input type="hidden" name="stageId" value={stageId} />
            <input type="hidden" name="pathId" value={id} />
            <ActionButton
              variant="submit"
              label={task.stage.validationType === "repo_exists" ? "Verify and Complete Task" : "Complete Task"}
              completed={isCompleted}
              loadingText={task.stage.validationType === "repo_exists" ? "Verifying..." : "Completing..."}
              showCheckIcon
              size="lg"
            />
          </form>
        </div>

      </div>
    </main>
  )
}
