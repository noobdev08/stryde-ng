import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import Logo from '@/components/Logo'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />

      {/* Navbar (Simplified) */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo size={32} />
        </div>
        <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles size={12} />
          Now in Private Beta
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
          Stop watching. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Start shipping.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The execution platform for developers who are tired of tutorial hell. 
          Build real projects, track your momentum, and master the stack.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="text-slate-500 text-sm font-medium">
            Join <span className="text-white font-bold">14+ developers</span> on the waitlist 🚀
          </div>
        </div>
      </div>
    </main>
  )
}