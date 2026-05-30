import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">
      <Sidebar />
      {/* Mobile: pt-18 (72px) to clear mobile header
          Tablet (sm): pt-16 (64px) with adjusted header height
          Desktop (lg): no padding, sidebar handles layout via ml-64
      */}
      <div className="flex-1 lg:ml-64 pt-18 sm:pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  )
}