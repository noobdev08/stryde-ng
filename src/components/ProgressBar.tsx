interface ProgressBarProps {
  percentage: number
  label?: boolean
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({ percentage, label = false, size = "md" }: ProgressBarProps) {
  const heightClasses = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2",
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
          <span className="text-blue-400">{percentage}% Complete</span>
        </div>
      )}
      <div className={`w-full ${heightClasses[size]} bg-slate-900 rounded-full overflow-hidden`}>
        <div
          className="h-full bg-blue-500 transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
