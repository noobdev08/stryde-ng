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
    sm: "px-8 py-2.5 text-[10px]",
    md: "py-4 text-sm",
    lg: "py-4 text-base",
  }

  const baseClasses = `w-full font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`

  // Completed state
  if (completed && variant === "submit") {
    return (
      <button
        disabled
        className={`${baseClasses} ${sizeClasses[size]} bg-emerald-500/10 border border-emerald-500/20 text-emerald-500`}
      >
        <Check size={20} strokeWidth={3} />
        Completed
      </button>
    )
  }

  // Pending state styling
  const pendingClass = isPending ? "bg-blue-600/50 cursor-wait opacity-80" : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]"

  return (
    <button
      type={variant === "submit" ? "submit" : "button"}
      disabled={isPending}
      onClick={variant === "navigate" ? handleNavigate : undefined}
      className={`${baseClasses} ${sizeClasses[size]} ${pendingClass} text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]`}
    >
      {isPending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          {displayLoadingText}
        </>
      ) : (
        <>
          {showCheckIcon && <Check size={20} strokeWidth={3} className="opacity-40" />}
          {displayLabel}
        </>
      )}
    </button>
  )
}
