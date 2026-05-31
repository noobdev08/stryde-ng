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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0b1120] border-b border-slate-800/50 fixed top-0 w-full z-50 backdrop-blur-xl bg-opacity-90">
        <Logo size={36} showText={true} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white p-2.5 h-11 w-11 flex items-center justify-center rounded-xl transition-all bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 h-screen w-72 bg-gradient-to-b from-[#0b1120] to-slate-950/80 border-r border-slate-800/60
          flex flex-col px-5 pt-20 lg:pt-8
          transition-all duration-500 ease-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-none lg:bg-[#0b1120]
        `}
      >
        {/* Logo */}
        <div className="hidden lg:flex mb-10 ml-1">
          <Logo size={36} showText={true} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                  ${isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-white border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-700/50 border border-transparent"
                  }
                `}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                <link.icon
                  size={22}
                  className={
                    isActive
                      ? "text-blue-400"
                      : "group-hover:text-blue-400 transition-colors"
                  }
                />
                <span className="font-semibold text-sm tracking-wide">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <form action={logout} className="mt-auto mb-8">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-5 py-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-red-500/20"
          >
            <LogOut size={22} />
            <span className="font-semibold text-sm tracking-wide">Log out</span>
          </button>
        </form>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}