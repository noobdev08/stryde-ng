import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">
      <Sidebar />
      {/* On mobile (lg:hidden), we add pt-16 to push content 
         below the fixed hamburger header 
      */}
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  )
}