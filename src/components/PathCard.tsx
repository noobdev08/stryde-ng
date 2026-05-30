import React from 'react'
import { Lock, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "./StatusBadge"

interface PathCardProps {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  progress: number
  isLocked?: boolean
  isNew?: boolean
  difficulty?: "beginner" | "intermediate" | "advanced"
  completedCount?: number
  totalCount?: number
  className?: string
}

export default function PathCard({
  id,
  title,
  description,
  icon,
  progress,
  isLocked,
  isNew,
  difficulty,
  completedCount = 0,
  totalCount = 0,
  className = ""
}: PathCardProps) {
  // Locked state
  if (isLocked) {
    return (
      <div className={`
        bg-slate-900/30 border-2 border-dashed border-slate-700/40
        rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center
        min-h-[160px] sm:min-h-[180px] md:min-h-[240px] opacity-60 transition-all hover:opacity-70
        ${className}
      `}>
        <div className="p-2 sm:p-3 md:p-4 bg-slate-800/50 rounded-lg md:rounded-xl mb-2 sm:mb-3 md:mb-4">
          <Lock className="text-slate-600 size-6 sm:size-7" />
        </div>
        <h3 className="font-bold text-slate-500 text-sm md:text-base lg:text-lg text-center">{title}</h3>
        <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1 sm:mt-2">
          🔒 Unlock Later
        </p>
      </div>
    )
  }

  // Active state
  return (
    <Link href={`/paths/${id}`} className="block group">
      <div className={`
        bg-slate-900/40 border border-slate-700/40 hover:border-blue-500/40
        transition-all duration-300 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 relative overflow-hidden
        cursor-pointer min-h-[180px] sm:min-h-[200px] md:min-h-[260px] flex flex-col justify-between
        ${className}
      `}>
        {/* Background accent */}
        <div className="absolute -right-4 -top-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-500/5 blur-3xl
          group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />

        {/* Status Badges - Top Right */}
        <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-2 flex-wrap justify-end z-10">
          {isNew && <StatusBadge status="new" size="sm" />}
          {progress === 100 && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20
              text-emerald-300 text-xs font-bold rounded-full whitespace-nowrap">
              <CheckCircle size={12} /> Done
            </div>
          )}
        </div>

        {/* Header with Icon */}
        <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
          <div className="p-1.5 sm:p-2 md:p-3 bg-blue-600/10 w-fit rounded-lg md:rounded-xl
            border border-blue-500/20 group-hover:scale-110
            group-hover:border-blue-500/40 transition-all duration-300
            text-blue-400 shadow-sm">
            <div className="text-sm sm:text-base md:text-2xl">{icon}</div>
          </div>
          <ChevronRight size={16} className="text-slate-600 sm:size-18
            group-hover:text-blue-400 group-hover:translate-x-1 transition-all hidden md:block" />
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="font-black text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 md:mb-2 text-white tracking-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Difficulty Badge */}
        {difficulty && (
          <div className="mb-2 sm:mb-3 md:mb-4">
            <StatusBadge status={difficulty} size="sm" />
          </div>
        )}

        {/* Progress Stats */}
        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          <div className="flex justify-between items-center gap-2">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">
              Progress
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-400 flex-shrink-0">
              {progress}%
            </span>
          </div>
          {totalCount > 0 && (
            <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500">
              {completedCount} / {totalCount} tasks
            </div>
          )}
          <div className="h-1 sm:h-1.5 md:h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-full
                transition-all duration-1000 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
