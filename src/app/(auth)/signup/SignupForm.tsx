"use client"

import { signup } from '@/app/(auth)/actions'
import { ActionButton } from '@/components/ActionButton'
import { Rocket, User, Mail, Lock } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function SignupForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const success = searchParams.get('signup')

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
      
      {/* Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden border border-slate-800">

        {/* LEFT SIDE (Branding) */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600/20 to-[#0b1120] relative">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 blur-[100px]" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
               <Rocket className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
              Join the <br /> <span className="text-blue-500">Elite.</span>
            </h1>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Build real projects. Track progress. Master your craft with the STRYD framework.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-[#020617]">
          
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
              Create account
            </h2>
            <p className="text-slate-500 text-sm mb-8">Start your execution journey today.</p>

            {success && (
              <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                Account created! Please check your email to confirm your account before logging in.
              </div>
            )}

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {decodeURIComponent(error)}
              </div>
            )}

            <form action={signup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Emmanuel Adun"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

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

              <ActionButton variant="submit" text="Sign Up" loadingText="Creating..." />
            </form>

            <p className="text-sm text-slate-500 mt-8 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 font-bold hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}