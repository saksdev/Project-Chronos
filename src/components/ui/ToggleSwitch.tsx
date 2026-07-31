import { memo } from 'react'
import { TooltipOverlay } from './TooltipOverlay'

interface ToggleSwitchProps {
  label: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  activeColor?: 'cyan' | 'emerald'
  tooltip?: string
}

export const ToggleSwitch = memo(({
  label,
  enabled,
  onToggle,
  activeColor = 'cyan',
  tooltip,
}: ToggleSwitchProps) => {
  const isEmerald = activeColor === 'emerald'

  const activeTrackClass = isEmerald
    ? 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
    : 'bg-cyan-500/20 border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'

  const activeThumbClass = isEmerald
    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
    : 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]'

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        {tooltip && <TooltipOverlay content={tooltip} />}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onToggle(!enabled)}
        className={`w-11 h-6 rounded-full border transition-all duration-200 p-0.5 relative cursor-pointer focus:outline-none ${
          enabled
            ? activeTrackClass
            : 'bg-[#07080c] border-white/10'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full transition-transform duration-200 transform ${
            enabled
              ? `translate-x-5 ${activeThumbClass}`
              : 'translate-x-0 bg-gray-500'
          }`}
        ></div>
      </button>
    </div>
  )
})
