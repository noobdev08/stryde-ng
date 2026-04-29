"use client" // Required for the toggle state
import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Compass, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Paths", href: "/paths", icon: Compass },
    { name: "Progress", href: "/progress", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Header / Hamburger Button */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0b1120] border-b border-slate-800 fixed top-0 w-full z-50">
        <p className="text-blue-500 font-bold text-xl">Stryd</p>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`
        flex flex-col h-screen w-64 bg-[#0b1120] border-r border-slate-800/50 p-6 fixed z-40 transition-transform duration-300
        lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        <p className="text-blue-500 font-bold text-2xl mb-10 px-4 hidden lg:block">Stryd</p>

        <nav className="flex flex-col gap-2 flex-1 mt-16 lg:mt-0">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)} // Close on click for mobile
              className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all group"
            >
              <link.icon size={20} className="group-hover:text-blue-400" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 px-4 py-3 rounded-xl transition-all cursor-pointer mt-auto">
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </button>
      </div>

      {/* Mobile Overlay (closes menu when clicking outside) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}