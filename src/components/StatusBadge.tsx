"use client"

type StatusType = "new" | "in-progress" | "completed" | "locked" | "beginner" | "intermediate" | "advanced"

interface StatusBadgeProps {
  status: StatusType
  size?: "sm" | "md" | "lg"
}

const statusStyles = {
  new: { bg: "bg-blue-500/20", text: "text-blue-300", emoji: "✨" },
  "in-progress": { bg: "bg-amber-500/20", text: "text-amber-300", emoji: "⏳" },
  completed: { bg: "bg-emerald-500/20", text: "text-emerald-300", emoji: "✅" },
  locked: { bg: "bg-red-500/20", text: "text-red-300", emoji: "🔒" },
  beginner: { bg: "bg-emerald-500/20", text: "text-emerald-300", emoji: "👶" },
  intermediate: { bg: "bg-amber-500/20", text: "text-amber-300", emoji: "🏃" },
  advanced: { bg: "bg-red-500/20", text: "text-red-300", emoji: "🚀" }
}

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base"
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.new

  const labels = {
    new: "New",
    "in-progress": "In Progress",
    completed: "Completed",
    locked: "Locked",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
  }

  return (
    <span className={`
      inline-flex items-center gap-1 font-bold rounded-full whitespace-nowrap
      ${style.bg} ${style.text} ${sizeClasses[size]}
    `}>
      <span>{style.emoji}</span>
      <span>{labels[status]}</span>
    </span>
  )
}
