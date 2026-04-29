import React from 'react'
import { Lock, Code2 } from "lucide-react" //

interface PathCardProps {
  title: string
  description: string
  icon?: React.ReactNode // Changed to ReactNode to accept Lucide icons
  progress: number
  isLocked?: boolean
  className?: string
}

export default function PathCard({ title, description, icon, progress, isLocked, className = ""}: PathCardProps) {
  if (isLocked) {
    return (
      <div className={`bg-[#0f172a]/50 border-2 border-gray-800/60 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] border-dashed opacity-60 transition-all ${className}`}>
        <Lock className="text-gray-600 mb-3" size={32} />
        <h3 className="font-semibold text-gray-500">{title}</h3>
        <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-1">Locked</p>
      </div>
    )
  }

  return (
    <div className={`bg-[#0f172a] border border-gray-800 hover:border-blue-500/40 transition-all duration-300 rounded-2xl p-6 group cursor-pointer shadow-lg hover:shadow-blue-500/5 ${className}`}>
      {/* Icon with that subtle blue glow from your inspo */}
      <div className="mb-4 p-3 bg-blue-600/10 w-fit rounded-xl border border-blue-500/20 group-hover:scale-110 group-hover:border-blue-500/40 transition-all text-blue-400">
        {<Code2 size={24} />} 
      </div>
      
      <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
      <p className="text-xs text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
           <div className="h-1.5 flex-1 bg-gray-800/50 rounded-full overflow-hidden mr-3">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                style={{ width: `${progress}%` }}
              />
           </div>
           <span className="text-[10px] font-bold text-gray-500">{progress}%</span>
        </div>
      </div>
    </div>
  )
}