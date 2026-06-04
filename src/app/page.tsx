"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Code, GitBranch, CheckCircle, Zap, Award, Sparkles } from "lucide-react"
import Logo from "@/components/Logo"

function RevealOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 10s ease-in-out infinite 2s; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .grid-bg {
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-float absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/8 blur-[140px] rounded-full" />
        <div className="animate-float-delay absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/8 blur-[140px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo size={32} />
        </div>
        <Link
          href="/login"
          className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-widest mb-8">
            <Sparkles size={12} />
            Now in Private Beta
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[1.05] mb-8">
            Stop watching.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Start shipping.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            The execution platform for developers tired of tutorial hell. Build real projects, push to GitHub, and master the stack.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 group"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold py-4 px-10 rounded-2xl transition-all"
            >
              View Curriculum
            </a>
          </div>

          <p className="text-slate-500 text-sm">
            Join <span className="text-white font-bold">14+ developers</span> already building 🚀
          </p>
        </RevealOnScroll>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <RevealOnScroll className="text-center mb-20">
          <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4">THE PROCESS</p>
          <h2 className="text-4xl md:text-6xl font-black text-white">Three steps. No shortcuts.</h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              number: "01",
              title: "Get your task",
              desc: "Every task comes with clear instructions, educational context, and the exact resources you need.",
              icon: BookOpen,
            },
            {
              number: "02",
              title: "Build it on your machine",
              desc: "Write real code in your own editor. No sandboxes. No fake environments. Your machine, your setup.",
              icon: Code,
            },
            {
              number: "03",
              title: "Push to GitHub. We verify.",
              desc: "Push your work and Stryd checks your repo automatically before unlocking the next step.",
              icon: GitBranch,
            },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="relative p-8 border border-slate-800 hover:border-blue-500/40 rounded-2xl bg-slate-900/30 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 h-full">
                  <span className="text-6xl font-black text-slate-800 absolute top-6 right-8 select-none">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-600/20 flex items-center justify-center mb-6">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <RevealOnScroll className="text-center mb-20">
          <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4">WHAT YOU&apos;LL BUILD</p>
          <h2 className="text-4xl md:text-6xl font-black text-white">A structured path from zero to full-stack</h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Dev Environment",
              desc: "Get your machine ready before you write a single line of code.",
              badge: "FREE",
              stages: ["Git", "Terminal", "VS Code", "Node.js"],
              locked: false,
            },
            {
              name: "Frontend",
              desc: "HTML, CSS, JavaScript, React. Build real interfaces from scratch.",
              badge: "FREE",
              stages: ["HTML", "CSS", "JavaScript", "React", "Projects", "Capstone"],
              locked: false,
            },
            {
              name: "Backend",
              desc: "Node.js, Express, and databases. Build powerful APIs.",
              badge: "COMING SOON",
              stages: [],
              locked: true,
            },
            {
              name: "Fullstack",
              desc: "Combine frontend and backend to ship complete applications.",
              badge: "COMING SOON",
              stages: [],
              locked: true,
            },
          ].map((path, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <div className={`p-8 rounded-2xl border h-full transition-all duration-300 ${path.locked
                  ? "border-slate-800 bg-slate-900/20 opacity-50"
                  : "border-slate-800 hover:border-blue-500/40 bg-slate-900/30 hover:bg-slate-900/60 hover:-translate-y-1"
                }`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-black text-white">{path.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex-shrink-0 ml-4 ${path.locked
                      ? "bg-slate-800 text-slate-500"
                      : "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                    }`}>
                    {path.badge}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{path.desc}</p>
                {!path.locked && path.stages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {path.stages.map((stage) => (
                      <span key={stage} className="px-3 py-1 bg-slate-800/70 text-slate-300 text-xs font-bold rounded-full">
                        {stage}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* GitHub Verification */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4">THE DIFFERENCE</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              You&apos;t fake your way through Stryd.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Every task requires a real GitHub push. Stryd checks your repo exists before you advance. No checkbox. No honour system. Actual proof you built it.
            </p>
            <div className="flex items-center gap-3 text-green-400 font-bold">
              <CheckCircle size={20} />
              Verified execution. Real progress.
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="p-6 border border-slate-700 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-4">
                <span className="text-slate-400 text-sm font-bold">Checking repository...</span>
                <span className="text-slate-600 text-xs">stryd-html</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Repository found", sub: "github.com/developer/stryd-html" },
                  { label: "Commit history verified", sub: "7 commits found" },
                  { label: "Public repo confirmed", sub: "Accessible and valid" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={11} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-slate-400 text-sm font-bold">Status</span>
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  <CheckCircle size={13} className="text-green-400" />
                  <span className="text-green-400 font-black text-xs">Verified ✓</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <RevealOnScroll className="text-center mb-20">
          <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4">BUILT FOR</p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Nigerian CS students who are done watching.
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              text: "You've watched the same tutorial three times and still can't build anything",
            },
            {
              icon: Zap,
              text: "You want a portfolio but don't know what to actually build",
            },
            {
              icon: CheckCircle,
              text: "You're ready to put in the work — you just need the structure",
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="text-center p-8 border border-slate-800 rounded-2xl bg-slate-900/30 hover:border-slate-700 transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mx-auto mb-6">
                    <Icon size={26} className="text-blue-400" />
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">{item.text}</p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <RevealOnScroll>
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/15 via-slate-900 to-blue-900/15 border border-blue-500/20 rounded-3xl p-12 md:p-20 text-center">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                Your first task is waiting.
              </h2>
              <p className="text-xl text-slate-400 mb-10">Free to start. No credit card.</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 group"
              >
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 border-t border-slate-800/60">
        <p className="text-center text-slate-600 text-sm">
          © 2026 Stryd. Building developers who actually ship.
        </p>
      </footer>
    </main>
  )
}