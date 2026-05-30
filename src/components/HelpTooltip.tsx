"use client"

import { Info } from "lucide-react"

interface HelpTooltipProps {
  text: string
  position?: "top" | "bottom" | "left" | "right"
}

export function HelpTooltip({ text, position = "top" }: HelpTooltipProps) {
  const positionStyles = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  }

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-700/50",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-700/50",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-700/50",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-700/50"
  }

  return (
    <div className="group relative inline-block">
      <Info size={16} className="text-blue-400 cursor-help hover:text-blue-300 transition-colors" />
      <div className={`
        absolute ${positionStyles[position]} left-1/2 -translate-x-1/2
        hidden group-hover:block
        bg-slate-800 text-slate-100 text-xs px-3 py-2
        rounded-lg whitespace-nowrap shadow-lg border border-slate-700/50
        z-50 pointer-events-none
      `}>
        {text}
      </div>
    </div>
  )
}
