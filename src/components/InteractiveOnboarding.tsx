"use client"

import { useState } from "react"
import { X, ArrowRight, CheckCircle, Sparkles, Target, Flame, Compass } from "lucide-react"
import { Card } from "./Card"

const ONBOARDING_KEY = "stryd_onboarding_complete"

interface InteractiveOnboardingProps {
  userName: string
  completedCount: number
}

const steps = [
  {
    id: 1,
    title: "Welcome to Stryd!",
    description: "Let's quickly walk through how everything works — it'll only take a minute!",
    icon: <Sparkles className="text-blue-400" size={32} />,
  },
  {
    id: 2,
    title: "Choose Your Path",
    description: "Select a learning path that matches your goals — Frontend, Backend, or Fullstack.",
    icon: <Compass className="text-purple-400" size={32} />,
  },
  {
    id: 3,
    title: "Complete Tasks",
    description: "Work through sequential tasks that build upon each other to develop real skills.",
    icon: <Target className="text-emerald-400" size={32} />,
  },
  {
    id: 4,
    title: "Track Your Momentum",
    description: "Maintain your daily streak and watch your progress grow every day!",
    icon: <Flame className="text-orange-400" size={32} />,
  },
]

export function InteractiveOnboarding({ userName, completedCount }: InteractiveOnboardingProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Check if should show onboarding
  let shouldShowOnboarding = false
  if (typeof window !== 'undefined') {
    const isComplete = localStorage.getItem(ONBOARDING_KEY)
    shouldShowOnboarding = !isComplete && !isDismissed && completedCount === 0
  }

  if (!shouldShowOnboarding) return null

  const step = steps.find(s => s.id === currentStep)
  if (!step) return null

  const currentStepData = {
    ...step,
    description: step.description.replace('{userName}', userName)
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true")
    setIsDismissed(true)
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const skipOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true")
    setIsDismissed(true)
  }

  return (
    <div className="mb-8">
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-7">
          {/* Top section - Header and close button */}
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              {currentStepData.icon}
              <div>
                <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">
                  Onboarding {currentStep}/{steps.length}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {currentStepData.title}
                </h3>
              </div>
            </div>
            <button
              onClick={skipOnboarding}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
              aria-label="Skip onboarding"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base mb-6">
            {currentStepData.description}
          </p>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                  ${
                    step.id < currentStep
                      ? "bg-emerald-500 text-white"
                      : step.id === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-500"
                  }
                `}
              >
                {step.id < currentStep ? (
                  <CheckCircle size={16} />
                ) : (
                  <span className="text-xs font-bold">{step.id}</span>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={skipOnboarding}
              className="text-slate-500 hover:text-slate-300 text-sm font-semibold transition-colors"
            >
              Skip onboarding
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-5 rounded-xl transition-all"
            >
              {currentStep === steps.length ? (
                "Get Started"
              ) : (
                <>
                  Next <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
