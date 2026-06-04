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
  completedCount?: number
  totalCount?: number
  className?: string
  comingSoon?: boolean
}

export default function PathCard({
  id,
  title,
  description,
  icon,
  progress,
  isLocked,
  isNew,
  completedCount = 0,
  totalCount = 0,
  className = "",
  comingSoon = false
}: PathCardProps) {
  if (isLocked && !comingSoon) {
    return (
      <div className={`
        bg-slate-900/30 border-2 border-dashed border-slate-700/40
        rounded-2xl p-6 flex flex-col items-center justify-center
        min-h-[220px] opacity-60 transition-all hover:opacity-70 hover:border-slate-600/50
        ${className}
      `}>
        <div className="p-4 bg-slate-800/50 rounded-2xl mb-4">
          <Lock className="text-slate-600 size-8" />
        </div>
        <h3 className="font-bold text-slate-500 text-lg text-center">{title}</h3>
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-2">
          🔒 Unlock Later
        </p>
      </div>
    )
  }

  const cardContent = (
    <div className={`
      border border-slate-800 bg-slate-900/30 hover:border-blue-500/40 hover:bg-slate-900/60
      transition-all duration-300 rounded-2xl p-6 relative overflow-hidden
      cursor-pointer min-h-[260px] flex flex-col justify-between hover:-translate-y-1
      ${comingSoon ? 'opacity-60' : ''}
      ${className}
    `}>
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/5 blur-3xl
        group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />

      <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end z-10">
        {comingSoon && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-500/20
            text-slate-300 text-xs font-bold rounded-full whitespace-nowrap border border-slate-500/30">
            Coming Soon
          </div>
        )}
        {isNew && !comingSoon && <StatusBadge status="new" size="sm" />}
        {progress === 100 && !comingSoon && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20
            text-emerald-300 text-xs font-bold rounded-full whitespace-nowrap border border-emerald-500/30">
            <CheckCircle size={14} /> Completed
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className="p-3.5 bg-gradient-to-br from-blue-600/15 to-blue-500/5 w-fit rounded-2xl
          border border-blue-500/25 group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300
          text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <div className="text-2xl">{icon}</div>
        </div>
        <ChevronRight size={20} className="text-slate-600
          group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
      </div>

      <div className="flex-1 mb-4">
        <h3 className="font-black text-xl mb-2 text-white tracking-tight line-clamp-2 group-hover:text-blue-50 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Progress
          </span>
          <span className="text-sm font-black text-blue-400 flex-shrink-0">
            {progress}%
          </span>
        </div>
        {totalCount > 0 && (
          <div className="text-xs text-slate-500">
            {completedCount} / {totalCount} tasks
          </div>
        )}
        <div className="h-2.5 w-full bg-slate-800/60 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-400 h-full
              transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )

  if (comingSoon) {
    return <div className="group">{cardContent}</div>
  }

  return (
    <Link href={`/paths/${id}`} className="block group">
      {cardContent}
    </Link>
  )
}
