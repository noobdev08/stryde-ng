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
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800 fixed top-0 w-full z-50">
        <Logo size={36} showText={true} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white p-2.5 h-11 w-11 flex items-center justify-center rounded-2xl transition-all bg-slate-900/30 border border-slate-800 hover:bg-slate-900/60 hover:border-blue-500/40"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 h-screen w-72 bg-slate-950 border-r border-slate-800
          flex flex-col px-5 pt-20 lg:pt-8
          transition-all duration-500 ease-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-none
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
                  flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden border
                  ${isActive
                    ? "bg-slate-900/30 text-white border-blue-500/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/30 border-slate-800 hover:border-blue-500/40"
                  }
                `}
              >
                <link.icon
                  size={22}
                  className={
                    isActive
                      ? "text-blue-400"
                      : "group-hover:text-blue-400 transition-colors"
                  }
                />
                <span className="font-black text-sm">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <form action={logout} className="mt-auto mb-8">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-5 py-4 rounded-2xl transition-all duration-300 border border-slate-800 hover:border-red-500/40"
          >
            <LogOut size={22} />
            <span className="font-black text-sm">Log out</span>
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