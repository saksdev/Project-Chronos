import { useState, memo } from 'react'

interface TooltipOverlayProps {
  content: string
}

export const TooltipOverlay = memo(({ content }: TooltipOverlayProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="w-3.5 h-3.5 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-500/40 text-[9px] font-mono text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-help ml-1.5 focus:outline-none"
        aria-label="Field information"
      >
        i
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-[#0d1222] border border-white/20 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.8)] text-[10px] font-mono text-gray-300 pointer-events-none z-50 transition-all leading-normal">
          <div className="relative">
            {content}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0d1222]"></div>
          </div>
        </div>
      )}
    </div>
  )
})
