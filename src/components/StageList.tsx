"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, ChevronRight, CircleCheck } from "lucide-react"
import UpgradeModal from "@/components/UpgradeModal"
import { canAccess, Plan } from "@/utils/lib/plans"
import { Card } from "./Card"

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
      <div className="flex flex-col gap-4">
        {stages.map((stage, index) => {
          const accessible = canAccess(userPlan, stage.requiredPlan)
          const completedTasks = stage.tasks.filter((t) => t.userProgress.length > 0).length
          const totalTasks = stage.tasks.length
          const isFinished = completedTasks === totalTasks && totalTasks > 0
          const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

          return (
            <div key={stage.id} className="relative group">
              {accessible ? (
                <Link href={`/paths/${pathId}/${stage.id}`}>
                  <Card className={`p-5 md:p-6 hoverable ${isFinished ? "border-emerald-500/20 bg-emerald-500/5" : ""}`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-5">
                        {/* Status Icon */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                          ${isFinished ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800/50 text-slate-400 border border-slate-700/50"}
                        `}>
                          {isFinished ? (
                            <CircleCheck size={24} />
                          ) : (
                            <div className="text-lg font-bold">{index + 1}</div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <p className={`text-base md:text-lg font-bold transition-colors group-hover:text-blue-400 ${isFinished ? "text-emerald-200" : "text-white"}`}>
                              {stage.name}
                            </p>
                            {!accessible && (
                              <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {stage.requiredPlan}
                              </span>
                            )}
                          </div>

                          {stage.description && (
                            <p className="text-xs md:text-sm text-slate-500 line-clamp-1">
                              {stage.description}
                            </p>
                          )}

                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-slate-400">
                                {completedTasks} / {totalTasks} tasks
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${isFinished ? "bg-emerald-500" : "bg-blue-500"}`}
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <ChevronRight size={20} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </Card>
                </Link>
              ) : (
                <button
                  onClick={() => setModalStage(stage)}
                  className="w-full text-left"
                >
                  <Card className="p-5 md:p-6 opacity-60 cursor-not-allowed">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-800/50 text-slate-600 border border-slate-700/50">
                          <Lock size={24} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-base md:text-lg font-bold text-slate-500">
                              {stage.name}
                            </p>
                            <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {stage.requiredPlan}
                            </span>
                          </div>
                          {stage.description && (
                            <p className="text-xs md:text-sm text-slate-600 line-clamp-1">
                              {stage.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
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
