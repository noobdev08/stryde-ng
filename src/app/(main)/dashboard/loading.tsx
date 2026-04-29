import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-brand blur-2xl opacity-20 animate-pulse" />
        <Zap size={48} className="text-brand relative animate-bounce" fill="currentColor" />
      </div>
      <p className="text-muted font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
        Synchronizing Path...
      </p>
    </div>
  );
}