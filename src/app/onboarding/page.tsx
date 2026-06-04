"use client"

import { useState } from "react"
import { Sparkles, Zap, Code } from "lucide-react"
import { completeOnboarding } from "@/app/actions/onboarding"

type Level = "beginner" | "intermediate" | "advanced" | null

export default function OnboardingPage() {
  const [screen, setScreen] = useState<1 | 2>(1)
  const [selectedLevel, setSelectedLevel] = useState<Level>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async () => {
    if (!selectedLevel) return
    setIsSubmitting(true)
    try {
      await completeOnboarding(selectedLevel)
    } catch(error) {
      console.error("Onboarding error:", error)
      setIsSubmitting(false)
    }
  }

  if (screen === 1) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
        <div className="fixed inset-0 pointer-events-none">
          <div className="grid-bg absolute inset-0" />
          <div className="animate-float absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/8 blur-[140px] rounded-full" />
          <div className="animate-float absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/8 blur-[140px] rounded-full" />
        </div>
        <div className="max-w-2xl w-full relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white mb-4">
              Here is how Stryd works
            </h1>
            <p className="text-slate-400 text-lg">
              Three simple steps to level up your skills
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-blue-600/15 rounded-2xl border border-blue-500/30 group-hover:border-blue-500/50 transition-all flex-shrink-0 w-fit">
                <Code className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">
                  You get a task with clear instructions
                </h3>
                <p className="text-slate-400">
                  Every task comes with exactly what you need to build and why it matters
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-blue-600/15 rounded-2xl border border-blue-500/30 group-hover:border-blue-500/50 transition-all flex-shrink-0 w-fit">
                <Zap className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">
                  You build it on your machine
                </h3>
                <p className="text-slate-400">
                  Write code locally in your favorite editor. You&apos;re in control
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-blue-600/15 rounded-2xl border border-blue-500/30 group-hover:border-blue-500/50 transition-all flex-shrink-0 w-fit">
                <Sparkles className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">
                  You push to GitHub and we verify it
                </h3>
                <p className="text-slate-400">
                  Push your work to a GitHub repo. We check it automatically
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen(2)}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl
              transition-all duration-300 text-lg shadow-2xl shadow-blue-600/30"
          >
            Got it, let&apos;s go
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-float absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/8 blur-[140px] rounded-full" />
        <div className="animate-float absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/8 blur-[140px] rounded-full" />
      </div>
      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">
            Where are you starting from?
          </h1>
          <p className="text-slate-400 text-lg">
            We&apos;ll tailor your experience to your skill level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              id: "beginner" as const,
              title: "Starting from zero",
              description: "Never written code before or just getting started"
            },
            {
              id: "intermediate" as const,
              title: "I've written some code",
              description: "Comfortable with the basics, ready to build"
            },
            {
              id: "advanced" as const,
              title: "I'm already building things",
              description: "Want to jump straight into Frontend"
            }
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-6 rounded-2xl border transition-all text-left
                ${selectedLevel === level.id
                  ? "border-blue-500/50 bg-blue-600/15"
                  : "border-slate-800 bg-slate-900/30 hover:border-blue-500/40 hover:bg-slate-900/50 hover:-translate-y-1"
                }
              `}
            >
              <h3 className="text-lg font-black text-white mb-2">
                {level.title}
              </h3>
              <p className="text-sm text-slate-400">
                {level.description}
              </p>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setScreen(1)}
            className="flex-1 px-6 py-4 border border-slate-800 text-slate-300 font-black rounded-2xl
              hover:border-slate-700 hover:text-white transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedLevel || isSubmitting}
            className={`flex-1 px-6 py-4 font-black rounded-2xl transition-all duration-300 shadow-2xl
              ${selectedLevel && !isSubmitting
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}
