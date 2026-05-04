import Link from "next/link"
import { Check, Lock, Zap, ArrowLeft } from "lucide-react"

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

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">

        {/* Back */}
        <div className="mb-12">
          <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Stop watching. Start building.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Pick the plan that matches where you are. Upgrade or cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? "bg-blue-600 border border-blue-500"
                  : "bg-[#0f172a] border border-slate-800"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${
                plan.highlighted ? "text-blue-200" : "text-slate-500"
              }`}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className={`text-3xl font-black ${plan.comingSoon ? "text-slate-500" : "text-white"}`}>
                  {plan.price}
                </span>
                {plan.priceSubtext && (
                  <span className={`text-sm ml-2 ${plan.highlighted ? "text-blue-200" : "text-slate-500"}`}>
                    {plan.priceSubtext}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`text-sm mb-8 ${plan.highlighted ? "text-blue-100" : "text-slate-400"}`}>
                {plan.description}
              </p>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`w-full text-center py-3 rounded-xl text-sm font-black mb-8 transition-all ${
                  plan.highlighted
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : plan.comingSoon
                    ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed pointer-events-none"
                    : "bg-slate-800 text-white border border-slate-700 hover:border-slate-500"
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <div className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-white" : "text-blue-500"}`}
                    />
                    <span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-300"}`}>
                      {f}
                    </span>
                  </div>
                ))}

                {plan.locked.length > 0 && (
                  <div className="mt-2 pt-4 border-t border-slate-700/50 flex flex-col gap-3">
                    {plan.locked.map((f) => (
                      <div key={f} className="flex items-start gap-3 opacity-40">
                        <Lock size={13} className="mt-0.5 shrink-0 text-slate-400" />
                        <span className="text-sm text-slate-400">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-sm mt-12">
          Payments processed securely via Paystack. Nigerian cards & bank transfer accepted.
        </p>

      </div>
    </main>
  )
}
