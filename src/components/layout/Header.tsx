import { memo } from 'react'

interface HeaderProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

export const Header = memo(({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between bg-[#0d1222]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-3.5 shadow-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#00f0ff]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
        </div>
        <div>
          <h1 className="text-xs md:text-sm font-bold tracking-widest text-white font-heading uppercase">
            Project Chronos
          </h1>
          <span className="text-[10px] font-mono text-cyan-400 block tracking-tight">
            Responsive Architecture
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          120 FPS Target
        </span>
      </div>
    </header>
  )
})
