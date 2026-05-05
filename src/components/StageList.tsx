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
      <div className="flex flex-col gap-3">
        {stages.map((stage) => {
          const accessible = canAccess(userPlan, stage.requiredPlan)
          const completedTasks = stage.tasks.filter(
            (t) => t.userProgress.length > 0
          ).length
          const totalTasks = stage.tasks.length

          if (accessible) {
            return (
              <Link
                key={stage.id}
                href={`/paths/${pathId}/${stage.id}`}
                className="flex items-center justify-between p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stage.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {completedTasks} / {totalTasks} tasks complete
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-600 group-hover:text-slate-400 transition-colors"
                />
              </Link>
            )
          }

          return (
            <button
              key={stage.id}
              onClick={() => setModalStage(stage)}
              className="flex items-center justify-between p-5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group text-left w-full opacity-60"
            >
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  {stage.name}
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {stage.requiredPlan}
                  </span>
                </p>
                <p className="text-slate-500 text-xs mt-1">{stage.description}</p>
              </div>
              <Lock size={16} className="text-slate-600 shrink-0" />
            </button>
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