"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Compass, BarChart3, Settings, LogOut, Menu, X, Tag } from "lucide-react"
import Logo from "@/components/Logo"
import { logout } from "@/app/(auth)/actions"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Paths", href: "/paths", icon: Compass },
    { name: "Progress", href: "/progress", icon: BarChart3 },
    { name: "Pricing", href: "/pricing", icon: Tag },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0b1120] border-b border-slate-800 fixed top-0 w-full z-50">
        <Logo size={32} showText={false} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white p-2 h-10 w-10 flex items-center justify-center rounded-lg transition-all"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 h-screen w-64 bg-[#0b1120] border-r border-slate-800/50
          flex flex-col px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-6
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="hidden lg:flex mb-10 justify-left ml-2">
          <Logo size={32} showText={true} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 sm:py-3 rounded-lg transition-all group
                  ${isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1"
                  }
                `}
              >
                <link.icon
                  size={20}
                  className={
                    isActive
                      ? "text-blue-400"
                      : "group-hover:text-blue-400"
                  }
                />
                <span className="font-medium text-sm sm:text-base">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 text-slate-400 hover:text-red-400 px-4 py-3 rounded-lg transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm sm:text-base cursor-pointer">Log out</span>
        </button>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}