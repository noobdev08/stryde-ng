import Link from "next/link"
import { Check, Lock } from "lucide-react"
import { SectionHeader } from "@/components/SectionHeader"
import { Card } from "@/components/Card"
import { createClient } from "@/utils/supabase/server"

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceSubtext: "forever",
    description: "Get a feel for how Stryd works",
    cta: "Get started",
    ctaHref: "/signup",
    highlighted: false,
    features: [
      "Frontend path — HTML stage only",
      "12 sequential tasks",
      "Streak tracking",
      "Progress dashboard",
    ],
    locked: [
      "CSS, JavaScript, React stages",
      "Backend & Fullstack paths",
      "Projects & Capstones",
    ],
  },
  {
    name: "Basic",
    price: "₦5,000",
    priceSubtext: "per month",
    description: "Unlock the full Frontend path",
    cta: "Get Basic",
    ctaHref: "/checkout?plan=basic",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Everything in Starter",
      "Full Frontend path unlocked",
      "HTML, CSS, JavaScript, React",
      "Projects & Capstone stages",
      "Priority support",
    ],
    locked: [
      "Backend & Fullstack paths",
    ],
  },
  {
    name: "Pro",
    price: "Coming soon",
    priceSubtext: "",
    description: "Backend, Fullstack, DevOps — the full stack",
    cta: "Join waitlist",
    ctaHref: "/waitlist",
    highlighted: false,
    comingSoon: true,
    features: [
      "Everything in Basic",
      "Backend path",
      "Fullstack path",
      "DevOps path",
      "AI-powered feedback",
      "Community access",
    ],
    locked: [],
  },
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isOnFreePlan = !!user
  return (
    <main className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-14 md:pt-16 pb-24">

        {/* Header */}
        <SectionHeader
          title="Stop watching. Start building."
          subtitle="Pick the plan that matches where you are. Upgrade or cancel anytime."
          badge="Pricing"
        />

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative"
            >
              <Card className={`
                p-6 md:p-7 flex flex-col h-full
                ${plan.highlighted
                  ? "bg-gradient-to-b from-blue-600/30 to-blue-600/10 border-blue-500"
                  : "bg-slate-900/60 border-slate-800"
                }
              `}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className={`text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${
                  plan.highlighted ? "text-blue-200" : "text-slate-500"
                }`}>
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mb-3">
                  <span className={`text-3xl md:text-4xl font-black ${plan.comingSoon ? "text-slate-500" : "text-white"}`}>
                    {plan.price}
                  </span>
                  {plan.priceSubtext && (
                    <span className={`text-sm md:text-base ml-2 ${plan.highlighted ? "text-blue-200" : "text-slate-500"}`}>
                      {plan.priceSubtext}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className={`text-sm md:text-base mb-8 ${plan.highlighted ? "text-blue-100" : "text-slate-400"}`}>
                  {plan.description}
                </p>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={`w-full text-center py-3 md:py-3.5 rounded-xl text-sm md:text-base font-black mb-8 transition-all ${
                    plan.name === "Starter" && isOnFreePlan
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-600/50 cursor-default pointer-events-none"
                      : plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                      : plan.comingSoon
                      ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed pointer-events-none"
                      : "bg-slate-800 text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-700"
                  }`}
                >
                  {plan.name === "Starter" && isOnFreePlan ? "Current plan" : plan.cta}
                </Link>

                {/* Features */}
                <div className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-white" : "text-blue-400"}`}
                      />
                      <span className={`text-sm md:text-base ${plan.highlighted ? "text-blue-100" : "text-slate-300"}`}>
                        {f}
                      </span>
                    </div>
                  ))}

                  {plan.locked.length > 0 && (
                    <div className="mt-2 pt-4 border-t border-slate-700/50 flex flex-col gap-3">
                      {plan.locked.map((f) => (
                        <div key={f} className="flex items-start gap-3 opacity-40">
                          <Lock size={14} className="mt-0.5 shrink-0 text-slate-400" />
                          <span className="text-sm md:text-base text-slate-400">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-sm md:text-base mt-12">
          Payments processed securely via Paystack. Nigerian cards & bank transfer accepted.
        </p>

      </div>
    </main>
  )
}
