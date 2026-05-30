"use client"

import { logIn } from '@/app/(auth)/actions'
import { ActionButton } from '@/components/ActionButton'
import { Sparkles, Mail, Lock, Globe } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
      
      {/* Container - Grid splits on desktop, stacks on mobile */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden border border-slate-800">

        {/* LEFT SIDE (Branding) */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600/20 to-[#0b1120] relative">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 blur-[100px]" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
               <Sparkles className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
              Execute your <br /> <span className="text-blue-500">vision.</span>
            </h1>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Morn calmly. Act decisively. Your developer journey continues here.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-[#020617]">
          
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Log in
            </h2>
            <p className="text-slate-500 text-sm mb-8">Welcome back, Developer.</p>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {decodeURIComponent(error)}
              </div>
            )}

            <form action={logIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <ActionButton variant="submit" text="Sign In" loadingText="Signing in..." />
            </form>

            <div className="my-6 flex items-center gap-4 text-slate-600">
              <div className="h-[1px] flex-1 bg-slate-800" />
              <span className="text-xs font-bold uppercase tracking-widest">or</span>
              <div className="h-[1px] flex-1 bg-slate-800" />
            </div>

            <button className="w-full py-3.5 rounded-2xl border border-slate-800 text-white hover:bg-slate-900 transition-all flex items-center justify-center gap-3 font-semibold cursor-pointer">
              <Globe size={20} />
              Google
            </button>

            <p className="text-sm text-slate-500 mt-8 text-center">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500 font-bold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}