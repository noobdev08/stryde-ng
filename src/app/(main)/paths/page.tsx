import PathCard from '@/components/PathCard'
import { Monitor, Database, Terminal, Layers } from 'lucide-react'

export default function PathPage() {
  const paths = [
    {
      title: "Frontend Path",
      description: "Master the art of building modern, responsive user interfaces with React and TypeScript.",
      icon: <Monitor size={24} />,
      progress: 30,
      isLocked: false,
    },
    {
      title: "Backend Path",
      description: "Dive deep into server-side logic, APIs, and database architecture using Node.js.",
      icon: <Database size={24} />,
      progress: 0,
      isLocked: true,
    },
    {
      title: "Fullstack Path",
      description: "The complete journey. Connect the dots between frontend and backend systems.",
      icon: <Layers size={24} />,
      progress: 0,
      isLocked: true,
    },
    {
      title: "Data Structures",
      description: "Master the fundamentals of efficient code and technical interviews.",
      icon: <Terminal size={24} />,
      progress: 0,
      isLocked: true,
    }
  ]

  return (
    <main className="flex-1 p-6 md:p-12 overflow-y-auto no-scrollbar">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Learning Paths</h1>
        <p className="text-slate-400">Choose your specialization and start executing.</p>
      </div>

      {/* Grid - 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, index) => (
          <PathCard 
            key={index}
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