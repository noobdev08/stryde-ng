"use client"

import { X } from "lucide-react"

interface SocialShareButtonProps {
  title: string
  text: string
  className?: string
}

export default function SocialShareButton({ title, text, className = "" }: SocialShareButtonProps) {
  const shareUrl = encodeURIComponent("https://stryd.dev") // Replace with your real domain later
  const fullText = encodeURIComponent(`${title}\n\n${text}`)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${fullText}&url=${shareUrl}`

  return (
    <button
      onClick={() => window.open(twitterUrl, "_blank", "noopener,noreferrer")}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300
        bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500
        text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5
        border border-white/10 ${className}`}
    >
      <X size={18} />
      <span>Share</span>
    </button>
  )
}
