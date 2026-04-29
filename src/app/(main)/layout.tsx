import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">
      {/* 1. Sidebar needs a fixed width and should not shrink */}
      <aside className="w-64 shrink-0 border-r border-gray-800">
        <Sidebar />
      </aside>

      {/* 2. Main content takes the remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}