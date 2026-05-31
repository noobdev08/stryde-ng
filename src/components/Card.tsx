import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`
      bg-slate-900/40 border border-slate-700/40 rounded-2xl
      ${hoverable ? 'hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
