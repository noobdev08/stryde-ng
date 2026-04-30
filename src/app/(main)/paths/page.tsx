import { createClient } from "@/utils/supabase/server"
import prisma from "../../../utils/lib/prismaClient"
import PathCard from '@/components/PathCard'
import { Monitor, Database, Terminal, Layers, Sparkles } from 'lucide-react'
import { redirect } from "next/navigation"

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

  // 2. Fetch all paths and include task counts to calculate progress
  const dbPaths = await prisma.path.findMany({
    orderBy: { order: 'asc' },
    include: {
      stages: {
        include: {
          tasks: {
            include: {
              userProgress: {
                where: { userId: user.id }
              }
            }
          }
        }
      }
    }
  })

  // 3. Process the data for the UI
  const processedPaths = dbPaths.map(path => {
    const allTasks = path.stages.flatMap(s => s.tasks)
    const completedTasks = allTasks.filter(t => t.userProgress.length > 0)
    const progressPercent = allTasks.length > 0 
      ? Math.round((completedTasks.length / allTasks.length) * 100) 
      : 0

    return {
      id: path.id,
      title: path.name,
      description: path.description || "Master this specialization.",
      icon: getIcon(path.name),
      progress: progressPercent,
      isLocked: path.isLocked
    }
  })

  return (
    <main className="flex-1 p-6 md:p-12 overflow-y-auto no-scrollbar max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
          Available Tracks
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Learning Paths</h1>
        <p className="text-slate-400">Choose your specialization and start executing.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedPaths.map((path) => (
          <PathCard 
            key={path.id}
            id={path.id} // Ensure your PathCard component accepts 'id' for linking
            title={path.title}
            description={path.description}
            icon={path.icon}
            progress={path.progress}
            isLocked={path.isLocked}
          />
        ))}
      </div>
    </main>
  )
}