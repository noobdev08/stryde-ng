"use client"

import { X, Lock, Zap, Check } from "lucide-react"
import Link from "next/link"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  stageName: string
  requiredPlan: "basic" | "pro"
}

export default function UpgradeModal({
  isOpen,
  onClose,
  stageName,
  requiredPlan,
}: UpgradeModalProps) {
  if (!isOpen) return null

  const isBasic = requiredPlan === "basic"

  const features = isBasic
    ? [
        "Full Frontend path — CSS, JS, React",
        "Projects & Capstone stages",
        "Priority support",
      ]
    : [
        "Everything in Basic",
        "Backend, Fullstack & DevOps paths",
        "AI-powered feedback",
        "Community access",
      ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
          <Lock size={22} className="text-blue-400" />
        </div>

        <h2 className="text-2xl font-black text-white mb-2">
          {stageName} is locked
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          Upgrade to{" "}
          <span className="text-white font-bold">
            {isBasic ? "Basic" : "Pro"}
          </span>{" "}
          to unlock this stage and keep building.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <Check size={14} className="text-blue-500 shrink-0" />
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mb-6 flex items-center justify-between">
          <span className="text-slate-400 text-sm font-medium">
            {isBasic ? "Basic plan" : "Pro plan"}
          </span>
          <span className="text-white font-black">
            {isBasic ? "₦3,500" : "Coming soon"}{" "}
            <span className="text-slate-500 font-normal text-xs">/month</span>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/pricing"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2"
          >
            <Zap size={15} />
            Upgrade to {isBasic ? "Basic" : "Pro"}
          </Link>
          <button
            onClick={onClose}
            className="w-full text-slate-500 hover:text-white text-sm py-2 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
