import Link from "next/link"
import { LayoutDashboard, Compass, BarChart3, Settings, LogOut } from "lucide-react"

export default function Sidebar() {
    return (
        <div className="flex flex-col h-screen w-64 bg-[#0b1120] border-r border-slate-800/50 p-6 fixed">
            
            {/* Logo */}
            <p className="text-blue-500 font-bold text-2xl mb-10 px-4">Stryd</p>

            {/* Nav Links */}
            <nav className="flex flex-col gap-2 flex-1">
                <Link href="/dashboard" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all group">
                    <LayoutDashboard size={20} className="group-hover:text-blue-400" />
                    <span className="font-medium">Dashboard</span>
                </Link>

                <Link href="/paths" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all group">
                    <Compass size={20} className="group-hover:text-blue-400" />
                    <span className="font-medium">Paths</span>
                </Link>

                <Link href="/progress" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all group">
                    <BarChart3 size={20} className="group-hover:text-blue-400" />
                    <span className="font-medium">Progress</span>
                </Link>

                <Link href="/settings" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all group">
                    <Settings size={20} className="group-hover:text-blue-400" />
                    <span className="font-medium">Settings</span>
                </Link>
            </nav>

            {/* Logout */}
            <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 px-4 py-3 rounded-xl transition-all cursor-pointer group mt-auto">
                <LogOut size={20} />
                <span className="font-medium">Log out</span>
            </button>
        </div>
    )
}