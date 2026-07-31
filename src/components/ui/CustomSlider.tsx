import { memo, type ChangeEvent } from 'react'
import { TooltipOverlay } from './TooltipOverlay'

interface CustomSliderProps {
  label: string
  min: number
  max: number
  step?: number
  value: number
  unit?: string
  tooltip?: string
  onChange: (val: number) => void
}

export const CustomSlider = memo(({
  label,
  min,
  max,
  step = 1,
  value,
  unit = '',
  tooltip,
  onChange,
}: CustomSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[11px] font-mono">
        <div className="flex items-center">
          <span className="text-gray-400 uppercase tracking-wider">{label}</span>
          {tooltip && <TooltipOverlay content={tooltip} />}
        </div>
        <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          {value}{unit}
        </span>
      </div>

      <div className="relative flex items-center h-6">
        {/* Track Background */}
        <div className="w-full h-2 bg-[#07080c] rounded-full border border-white/10 overflow-hidden relative">
          {/* Active Fill Rail */}
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-75 shadow-[0_0_10px_#00f0ff]"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Glowing Circular Handle Knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff] pointer-events-none transition-all duration-75"
          style={{ left: `calc(${percentage}% - 8px)` }}
        ></div>

        {/* Invisible Input Range Control Overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
})
