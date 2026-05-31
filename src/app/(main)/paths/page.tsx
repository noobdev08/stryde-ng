import { createClient } from "@/utils/supabase/server"
import PathCard from '@/components/PathCard'
import { Monitor, Database, Terminal, Layers, Sparkles } from 'lucide-react'
import { redirect } from "next/navigation"
import { getAllPathsWithProgress } from '@/utils/lib/pathQueries'
import { calculatePathProgress } from '@/utils/lib/progressCalculator'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'

const getIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Frontend": <Monitor size={24} />,
    "Backend": <Database size={24} />,
    "Fullstack": <Layers size={24} />,
    "Data Structures": <Terminal size={24} />,
  }
  return iconMap[name] || <Sparkles size={24} />
}

export default async function PathPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/login")

  const dbPaths = await getAllPathsWithProgress(user.id)

  const processedPaths = dbPaths.map(path => {
    const { progressPercent, totalCount, completedCount } = calculatePathProgress(path.stages)

    return {
      id: path.id,
      title: path.name,
      description: path.description || "Master this specialization.",
      icon: getIcon(path.name),
      progress: progressPercent,
      isLocked: path.isLocked,
      completedCount,
      totalCount
    }
  })

  const startedPaths = processedPaths.filter(p => p.progress > 0)
  const availablePaths = processedPaths.filter(p => p.progress === 0 && !p.isLocked)
  const lockedPaths = processedPaths.filter(p => p.isLocked)

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto no-scrollbar max-w-7xl mx-auto">
      <SectionHeader
        title="Learning Paths"
        subtitle="Choose your specialization and start executing."
        badge="Available Tracks"
      />
      
      {startedPaths.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Your Active Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {startedPaths.map((path) => (
              <PathCard
                key={path.id}
                id={path.id}
                title={path.title}
                description={path.description}
                icon={path.icon}
                progress={path.progress}
                isLocked={path.isLocked}
                completedCount={path.completedCount}
                totalCount={path.totalCount}
              />
            ))}
          </div>
        </div>
      )}

      {availablePaths.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Start a New Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {availablePaths.map((path) => (
              <PathCard
                key={path.id}
                id={path.id}
                title={path.title}
                description={path.description}
                icon={path.icon}
                progress={path.progress}
                isLocked={path.isLocked}
                completedCount={path.completedCount}
                totalCount={path.totalCount}
              />
            ))}
          </div>
        </div>
      )}

      {lockedPaths.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lockedPaths.map((path) => (
              <PathCard
                key={path.id}
                id={path.id}
                title={path.title}
                description={path.description}
                icon={path.icon}
                progress={path.progress}
                isLocked={path.isLocked}
                completedCount={path.completedCount}
                totalCount={path.totalCount}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
