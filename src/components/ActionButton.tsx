"use client"

import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Check } from "lucide-react"

interface ActionButtonProps {
  variant?: "submit" | "navigate"
  label?: string
  text?: string
  completed?: boolean
  href?: string
  loadingText?: string
  size?: "sm" | "md" | "lg"
  showCheckIcon?: boolean
  status?: "new" | "in-progress" | "completed" | "locked"
  tooltip?: string
}

export function ActionButton({
  variant = "submit",
  label,
  text = "Continue",
  completed = false,
  href,
  loadingText,
  size = "md",
  showCheckIcon = false,
  status,
  tooltip,
}: ActionButtonProps) {
  const { pending: formPending } = useFormStatus()
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const isPending = variant === "submit" ? formPending : isNavigating
  const displayLoadingText = loadingText || "Processing..."
  const displayLabel = label || text

  const handleNavigate = () => {
    if (isNavigating || !href) return
    setIsNavigating(true)
    router.push(href)
  }

  const sizeClasses = {
    sm: "px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm min-h-[36px] md:min-h-[40px]",
    md: "px-6 md:px-8 py-3 md:py-4 text-sm md:text-base min-h-[44px] md:min-h-[48px]",
    lg: "px-8 md:px-10 py-4 md:py-5 text-base md:text-lg min-h-[48px] md:min-h-[52px]",
  }

  const baseClasses = `w-full font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow-sm`

  // Status styles
  const statusStyles = {
    new: "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]",
    "in-progress": "bg-amber-600 hover:bg-amber-500 active:scale-[0.98]",
    completed: "bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98]",
    locked: "bg-slate-700/40 cursor-not-allowed opacity-60 text-slate-400"
  }

  // Completed state
  if (completed && variant === "submit") {
    return (
      <div className="group">
        <button
          disabled
          className={`${baseClasses} ${sizeClasses[size]} bg-emerald-500/10 border border-emerald-500/20 text-emerald-300`}
          title={tooltip}
        >
          <Check size={20} strokeWidth={3} />
          <span className="hidden sm:inline">Completed</span>
          <span className="sm:hidden text-xs">Done</span>
        </button>
        {tooltip && (
          <div className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {tooltip}
          </div>
        )}
      </div>
    )
  }

  // Pending state styling
  const pendingClass = isPending ? "bg-slate-700/40 cursor-wait opacity-80" : (statusStyles[status as keyof typeof statusStyles] || "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]")

  return (
    <div className="group">
      <button
        type={variant === "submit" ? "submit" : "button"}
        disabled={isPending}
        onClick={variant === "navigate" ? handleNavigate : undefined}
        className={`${baseClasses} ${sizeClasses[size]} ${pendingClass} text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]`}
        title={tooltip}
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span className="hidden sm:inline">{displayLoadingText}</span>
            <span className="sm:hidden text-xs">...</span>
          </>
        ) : (
          <>
            {showCheckIcon && <Check size={20} strokeWidth={3} className="opacity-40" />}
            {displayLabel}
          </>
        )}
      </button>
      {tooltip && !isPending && !completed && (
        <div className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {tooltip}
        </div>
      )}
    </div>
  )
}
