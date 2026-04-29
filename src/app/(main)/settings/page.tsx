import { User, Bell, Shield, Palette, Save } from 'lucide-react'

export default function SettingsPage() {
  const sections = [
    {
      title: "Profile Information",
      icon: <User size={18} className="text-blue-400" />,
      fields: [
        { label: "Display Name", type: "text", placeholder: "Nosa Adun" },
        { label: "Email Address", type: "email", placeholder: "nosa@example.com" },
      ]
    },
    {
      title: "Appearance",
      icon: <Palette size={18} className="text-purple-400" />,
      fields: [
        { label: "Theme", type: "select", options: ["Deep Sea (Dark)", "Onyx", "System"] },
      ]
    },
    {
      title: "Notifications",
      icon: <Bell size={18} className="text-orange-400" />,
      fields: [
        { label: "Study Reminders", type: "toggle" },
        { label: "Streak Alerts", type: "toggle" },
      ]
    }
  ]

  return (
    <main className="flex-1 p-6 md:p-12 overflow-y-auto no-scrollbar max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Settings</h1>
          <p className="text-slate-400 text-sm">Manage your account and preferences.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-800/50 rounded-lg">
                {section.icon}
              </div>
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Save Button */}
      <div className="mt-8 md:hidden">
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
          Save Changes
        </button>
      </div>
    </main>
  )
}