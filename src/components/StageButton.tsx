"use client"

import { useFormStatus } from "react-dom"
import { Loader2, Check } from "lucide-react"

interface SubmitButtonProps {
  label: string
  completed?: boolean
}

export default function SubmitButton({ label, completed }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  // If already completed in the DB
  if (completed) {
    return (
      <button 
        disabled 
        className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 cursor-not-allowed"
      >
        <Check size={20} strokeWidth={3} />
        Completed
      </button>
    )
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all cursor-pointer
        ${pending 
          ? 'bg-blue-600/50 cursor-wait opacity-80' 
          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-[0.98]'
        }
      `}
    >
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Check size={20} strokeWidth={3} className="opacity-40 cursor-pointer" />
          {label}
        </>
      )}
    </button>
  )
}