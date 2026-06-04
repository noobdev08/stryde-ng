import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`
      border border-slate-800 bg-slate-900/30 rounded-2xl
      ${hoverable ? 'hover:border-blue-500/40 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
