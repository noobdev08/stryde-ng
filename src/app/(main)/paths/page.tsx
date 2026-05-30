import { createClient } from "@/utils/supabase/server"
import prisma from "../../../utils/lib/prismaClient"
import PathCard from '@/components/PathCard'
import { Monitor, Database, Terminal, Layers, Sparkles } from 'lucide-react'
import { redirect } from "next/navigation"
import { getAllPathsWithProgress } from '@/utils/lib/pathQueries'
import { calculatePathProgress } from '@/utils/lib/progressCalculator'

// Helper to map icons to database names
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

  // 1. Get the real user session
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/login")

  // 2. Fetch all paths with progress
  const dbPaths = await getAllPathsWithProgress(user.id)

  // 3. Process the data for the UI
  const processedPaths = dbPaths.map(path => {
    const { progressPercent, totalCount, completedCount } = calculatePathProgress(path.stages)

    // Determine difficulty based on path name
    const difficultyMap: Record<string, "beginner" | "intermediate" | "advanced"> = {
      "Frontend": "beginner",
      "Backend": "intermediate",
      "Fullstack": "advanced",
      "Data Structures": "intermediate"
    }

    return {
      id: path.id,
      title: path.name,
      description: path.description || "Master this specialization.",
      icon: getIcon(path.name),
      progress: progressPercent,
      isLocked: path.isLocked,
      difficulty: difficultyMap[path.name] || "beginner",
      completedCount,
      totalCount
    }
  })

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 overflow-y-auto no-scrollbar max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4">
          Available Tracks
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-1 sm:mb-2">Learning Paths</h1>
        <p className="text-xs sm:text-sm text-slate-400">Choose your specialization and start executing.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedPaths.map((path) => (
          <PathCard
            key={path.id}
            id={path.id}
            title={path.title}
            description={path.description}
            icon={path.icon}
            progress={path.progress}
            isLocked={path.isLocked}
            difficulty={path.difficulty}
            completedCount={path.completedCount}
            totalCount={path.totalCount}
          />
        ))}
      </div>
    </main>
  )
}