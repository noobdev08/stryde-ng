import React from 'react'
import { Lock, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PathCardProps {
  id: string
  title: string
  description: string
  icon?: React.ReactNode 
  progress: number
  isLocked?: boolean
  className?: string
}

export default function PathCard({ id, title, description, icon, progress, isLocked, className = ""}: PathCardProps) {
  // 1. Locked State (No Link)
  if (isLocked) {
    return (
      <div className={`bg-[#0f172a]/50 border-2 border-slate-800/60 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[240px] border-dashed opacity-60 transition-all ${className}`}>
        <div className="p-4 bg-slate-800/50 rounded-2xl mb-4">
          <Lock className="text-slate-600" size={32} />
        </div>
        <h3 className="font-bold text-slate-500 text-lg">{title}</h3>
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 mt-2">Access Denied</p>
      </div>
    )
  }

  // 2. Active State (Wrapped in Link)
  return (
    <Link href={`/paths/${id}`} className="block">
      <div className={`bg-[#0f172a] border border-slate-800 hover:border-blue-500/40 transition-all duration-500 rounded-[2rem] p-8 group cursor-pointer shadow-lg hover:shadow-blue-500/5 relative overflow-hidden ${className}`}>
        
        {/* Subtle Background Accent */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />

        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-600/10 w-fit rounded-2xl border border-blue-500/20 group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            {icon} 
          </div>
          <ChevronRight size={20} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
        
        <h3 className="font-black text-xl mb-2 text-white tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-blue-400">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden p-[2px]">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}