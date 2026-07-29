import { memo } from 'react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Sidebar = memo(({ activeTab, setActiveTab }: SidebarProps) => {
  const navItems = [
    { id: 'shield', label: 'Input Buffer Shield' },
    { id: 'metrics', label: 'Performance Monitor' },
    { id: 'architecture', label: 'System Architecture' },
  ]

  return (
    <aside className="w-[260px] h-full bg-[#0d1222]/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between p-4 shadow-xl select-none shrink-0 overflow-y-auto">
      <div className="space-y-6">
        <div className="px-2 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">
            Navigation Shell
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-gray-600'
                  }`}
                ></span>
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-3 bg-[#07080c]/60 rounded-xl border border-white/5 text-[11px] font-mono text-gray-400">
        <span className="text-gray-500 block text-[10px] mb-1">Persistent Shell:</span>
        <span className="text-emerald-400 font-medium">260px Fixed Column</span>
      </div>
    </aside>
  )
})
