import React from 'react'

interface PathCardProps {
  title: string
  description: string
  icon: string
  progress: number
  isLocked?: boolean
  className?: string
}

export default function PathCard({ title, description, icon, progress, isLocked, className = ""}: PathCardProps) {
  if (isLocked) {
    return (
      <div className="bg-[#0f172a]/50 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] border-dashed opacity-60 ${className}">
        <span className="text-2xl mb-2">🔒</span>
        <h3 className="font-semibold text-gray-400">{title}</h3>
        <p className="text-xs text-gray-500">Locked</p>
      </div>
    )
  }

  return (
    <div className="bg-[#0f172a] border border-gray-800 hover:border-blue-500/50 transition-all duration-300 rounded-2xl p-6 group cursor-pointer shadow-lg hover:shadow-blue-500/5 ${className}">
      <div className="text-2xl mb-4 p-3 bg-blue-600/10 w-fit rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
           <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden mr-3">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              />
           </div>
           <span className="text-[10px] font-medium text-gray-500">{progress}%</span>
        </div>
      </div>
    </div>
  )
}