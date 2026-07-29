import { memo } from 'react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const MobileDrawer = memo(({ isOpen, onClose, activeTab, setActiveTab }: MobileDrawerProps) => {
  if (!isOpen) return null

  const navItems = [
    { id: 'shield', label: 'Input Buffer Shield' },
    { id: 'metrics', label: 'Performance Monitor' },
    { id: 'architecture', label: 'System Architecture' },
  ]

  return (
    <div className="md:hidden fixed inset-0 z-50 flex pointer-events-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <aside className="relative w-64 max-w-[80vw] bg-[#0d1222] border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl z-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id)
                    onClose()
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-mono font-medium transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-gray-600'
                    }`}
                  ></span>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-3 bg-[#07080c] rounded-xl border border-white/5 text-[11px] font-mono text-gray-400">
          <span className="text-gray-500 block text-[10px] mb-1">Viewport Mode:</span>
          <span className="text-cyan-400 font-medium">320px - 767px Mobile Drawer</span>
        </div>
      </aside>
    </div>
  )
})
