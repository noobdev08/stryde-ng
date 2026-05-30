"use client"

import { Sparkles } from "lucide-react"

interface OnboardingBannerProps {
  userName: string
  completedCount: number
}

export function OnboardingBanner({ userName, completedCount }: OnboardingBannerProps) {
  if (completedCount > 0) return null

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 mb-6">
      <div className="flex items-start gap-2 sm:gap-3">
        <Sparkles className="text-blue-400 mt-0.5 sm:mt-1 shrink-0 size-[18px] sm:size-[20px]"/>
        <div>
          <p className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5 sm:mb-1">
            Welcome, {userName}! 👋
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
            Start your learning journey by exploring a path below. Each task you complete builds real developer skills!
          </p>
        </div>
      </div>
    </div>
  )
}
