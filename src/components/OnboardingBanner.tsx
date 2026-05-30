"use client"

import { Sparkles } from "lucide-react"

interface OnboardingBannerProps {
  userName: string
  completedCount: number
}

export function OnboardingBanner({ userName, completedCount }: OnboardingBannerProps) {
  if (completedCount > 0) return null

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 md:p-6 mb-6">
      <div className="flex items-start gap-3">
        <Sparkles className="text-blue-400 mt-1 shrink-0" size={20} />
        <div>
          <p className="text-sm md:text-base font-bold text-white mb-1">
            Welcome, {userName}! 👋
          </p>
          <p className="text-xs md:text-sm text-slate-300">
            Start your learning journey by exploring a path below. Each task you complete builds real developer skills!
          </p>
        </div>
      </div>
    </div>
  )
}
