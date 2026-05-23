export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        
        {/* Skeleton Back Button */}
        <div className="w-8 h-8 bg-slate-900 rounded-lg animate-pulse mb-8" />

        {/* Skeleton Header */}
        <div className="mb-10 space-y-4">
          <div className="h-10 w-64 bg-slate-900 rounded-lg animate-pulse" />
          <div className="h-5 w-96 bg-slate-900/50 rounded-lg animate-pulse" />
        </div>

        {/* Skeleton Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-3">
            <div className="h-3 w-16 bg-slate-900 rounded-full animate-pulse" />
            <div className="h-3 w-24 bg-slate-900 rounded-full animate-pulse" />
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-slate-800 animate-pulse" />
          </div>
        </div>

        {/* Skeleton Task Cards */}
        <div className="space-y-4">
          <div className="h-4 w-20 bg-slate-900 rounded-full animate-pulse mb-6" />
          
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-6 rounded-xl border border-slate-900 bg-slate-900/20"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-slate-900 animate-pulse" />
                <div className="h-5 w-48 bg-slate-900 rounded-lg animate-pulse" />
              </div>
              <div className="h-10 w-24 bg-slate-900 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}