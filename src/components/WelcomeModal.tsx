"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

interface WelcomeModalProps {
  frontendPathId: string
}

export function WelcomeModal({ frontendPathId }: WelcomeModalProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get("welcome") === "advanced") {
      setIsOpen(true)
      // Remove query param from URL
      router.replace("/paths", { scroll: false })
    }
  }, [searchParams, router])

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-black text-white mb-4">
          You're ahead of the curve
        </h2>
        <p className="text-slate-400 mb-8">
          Backend and Fullstack are coming soon. Start the Frontend path now and you'll be way ahead when they drop.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 font-bold rounded-xl
              hover:border-slate-600 transition-colors"
          >
            Browse Paths
          </button>
          <Link
            href={`/paths/${frontendPathId}`}
            className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl
              transition-colors text-center"
          >
            Start Frontend
          </Link>
        </div>
      </div>
    </div>
  )
}
