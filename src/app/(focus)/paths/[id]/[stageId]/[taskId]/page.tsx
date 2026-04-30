import { createClient } from "@/utils/supabase/server"
import prisma from "@/utils/lib/prismaClient"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { completeTask } from "../../../../../actions/progress"
import StageButton from "../../../../../../components/StageButton"

export default async function TaskPage({ 
  params 
}: { 
  params: Promise<{ id: string; stageId: string; taskId: string }> 
}) {
  const { id, stageId, taskId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { 
      stage: { 
        include: { 
          tasks: { orderBy: { order: 'asc' } } 
        } 
      },
      userProgress: { where: { userId: user.id } }
    }
  })

  if (!task) notFound()

  const isCompleted = task.userProgress.length > 0
  const taskNumber = task.stage.tasks.findIndex(t => t.id === taskId) + 1
  const totalTasks = task.stage.tasks.length

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-20">
        
        {/* Simple Navigation */}
        <div className="mb-12">
          <Link href={`/paths/${id}/${stageId}`} className="text-slate-500 hover:text-white transition-colors inline-block">
            <ArrowLeft size={24} />
          </Link>
        </div>

        {/* Task Header */}
        <div className="mb-10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Task {taskNumber} of {totalTasks}
          </p>
          <h1 className="text-4xl font-black leading-tight mb-6">
            {task.title || task.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            {task.description || "In this task, you'll dive deep into the concepts and apply them practically to build your foundation."}
          </p>
        </div>

        {/* Resources Card */}
        <div className="mb-14">
          <h3 className="text-xs font-black text-slate-200 mb-4 uppercase tracking-widest">Resources</h3>
          <Link 
            href={task.resourceUrl || "#"} 
            target="_blank"
            className="flex items-center justify-between p-6 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
              MDN: {task.title ? task.title.split('—')[0].trim() : 'Documentation'}
            </span>
            <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
          </Link>
        </div>

        {/* Action Section */}
        <div className="border-t border-slate-900 pt-10">
          <h3 className="text-xs font-black text-slate-200 mb-2 uppercase tracking-widest">Mark as complete</h3>
          <p className="text-slate-500 text-sm mb-8">Complete this task to unlock the next one in the path.</p>
          
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