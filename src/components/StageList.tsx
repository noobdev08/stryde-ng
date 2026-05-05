"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, ChevronRight } from "lucide-react"
import UpgradeModal from "@/components/UpgradeModal"
import { canAccess, Plan } from "@/utils/lib/plans"

interface Stage {
  id: string
  name: string
  description: string | null
  isLocked: boolean
  requiredPlan: string
  tasks: { userProgress: { id: string }[] }[]
}

interface StageListProps {
  stages: Stage[]
  pathId: string
  userPlan: Plan
}

export default function StageList({ stages, pathId, userPlan }: StageListProps) {
  const [modalStage, setModalStage] = useState<Stage | null>(null)

  return (
    <>
      <div className="flex flex-col">
        {stages.map((stage, index) => {
          const accessible = canAccess(userPlan, stage.requiredPlan)
          const completedTasks = stage.tasks.filter((t) => t.userProgress.length > 0).length
          const totalTasks = stage.tasks.length
          const isFinished = completedTasks === totalTasks && totalTasks > 0

          const content = (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                {/* Index Number - consistent with your Stage Page */}
                <span className={`text-xs font-bold w-4 ${isFinished ? 'text-emerald-500' : 'text-slate-600'}`}>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                
                <div>
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-semibold transition-colors ${accessible ? 'text-white group-hover:text-blue-400' : 'text-slate-500'}`}>
                      {stage.name}
                    </p>
                    {!accessible && (
                      <span className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {stage.requiredPlan}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">
                    {completedTasks} / {totalTasks} Tasks Cleared
                  </p>
                </div>
              </div>

              {accessible ? (
                <ChevronRight size={14} className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              ) : (
                <Lock size={14} className="text-slate-800" />
              )}
            </div>
          )

          return (
            <div key={stage.id} className="relative group">
              {accessible ? (
                <Link
                  href={`/paths/${pathId}/${stage.id}`}
                  className="flex items-center p-6 border-b border-slate-900 transition-all hover:bg-blue-500/[0.02]"
                >
                  {content}
                </Link>
              ) : (
                <button
                  onClick={() => setModalStage(stage)}
                  className="flex items-center p-6 border-b border-slate-900 transition-all w-full text-left hover:bg-slate-900/20"
                >
                  {content}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {modalStage && (
        <UpgradeModal
          isOpen={true}
          onClose={() => setModalStage(null)}
          stageName={modalStage.name}
          requiredPlan={modalStage.requiredPlan as "basic" | "pro"}
        />
      )}
    </>
  )
}