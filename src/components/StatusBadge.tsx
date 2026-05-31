"use client"
import { Sparkles, Clock, CheckCircle, Lock, GraduationCap, TrendingUp, Zap } from "lucide-react"

type StatusType = "new" | "in-progress" | "completed" | "locked" | "beginner" | "intermediate" | "advanced"

interface StatusBadgeProps {
  status: StatusType
  size?: "sm" | "md" | "lg"
}

const statusStyles = {
  new: { bg: "bg-blue-500/20", text: "text-blue-300", icon: <Sparkles size={14} /> },
  "in-progress": { bg: "bg-amber-500/20", text: "text-amber-300", icon: <Clock size={14} /> },
  completed: { bg: "bg-emerald-500/20", text: "text-emerald-300", icon: <CheckCircle size={14} /> },
  locked: { bg: "bg-red-500/20", text: "text-red-300", icon: <Lock size={14} /> },
  beginner: { bg: "bg-emerald-500/20", text: "text-emerald-300", icon: <GraduationCap size={14} /> },
  intermediate: { bg: "bg-amber-500/20", text: "text-amber-300", icon: <TrendingUp size={14} /> },
  advanced: { bg: "bg-red-500/20", text: "text-red-300", icon: <Zap size={14} /> }
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
      {style.icon}
      <span>{labels[status]}</span>
    </span>
  )
}
