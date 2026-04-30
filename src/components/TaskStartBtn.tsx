"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function TaskStartButton({ href }: { href: string }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handlePush = () => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push(href)
  }

  return (
    <button
      onClick={handlePush}
      disabled={isNavigating}
      className={`
        bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2.5 rounded-lg transition-all flex items-center gap-2
        ${isNavigating ? 'opacity-70 cursor-wait' : 'hover:bg-blue-500 active:scale-95'}
      `}
    >
      {isNavigating ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Loading
        </>
      ) : (
        "Start"
      )}
    </button>
  )
}