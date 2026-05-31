import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, subtitle, badge, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
      <div className="space-y-1">
        {badge && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest w-fit">
            {badge}
          </div>
        )}
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
