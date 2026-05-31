"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { triggerConfetti } from "@/utils/lib/confetti"
import SocialShareButton from "@/components/SocialShareButton"

export default function StagePageClient({ stageName }: { stageName?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    if (searchParams.get("completed") === "true") {
      triggerConfetti()
      // Use requestAnimationFrame to batch state updates
      requestAnimationFrame(() => {
        setShowShare(true)
      })
      const params = new URLSearchParams(searchParams.toString())
      params.delete("completed")
      const newPath = params.toString() ? `?${params.toString()}` : ""
      router.replace(newPath, { scroll: false })
    }
  }, [searchParams, router])

  if (!showShare) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl">
        <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
          🎉 Awesome Work!
        </h3>
        <p className="text-blue-100 text-sm mb-4">
          Share your progress with your friends!
        </p>
        <div className="flex items-center gap-3">
          <SocialShareButton
            title="Just crushed a task on Stryd!"
            text={`${stageName ? `Working through ${stageName}` : "Learning to code by building real projects"}. Execution is everything!`}
          />
          <button
            onClick={() => setShowShare(false)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  )
}
