import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">
      <Sidebar />
      <div className="flex-1 lg:ml-72 pt-20 lg:pt-0">
        {children}
      </div>
    </div>
  )
}