import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse" />
        <Zap size={48} className="text-blue-400 relative animate-bounce" fill="currentColor" />
      </div>
      <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">
        Synchronizing Path...
      </p>
    </div>
  );
}