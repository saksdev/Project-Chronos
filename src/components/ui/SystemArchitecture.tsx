import { memo } from 'react'

export const SystemArchitecture = memo(() => {
  return (
    <div className="bg-[#0d1222]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-[0_16px_48px_rgba(0,0,0,0.6)] space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]"></span>
          <h3 className="text-xs font-bold tracking-wider text-white font-heading uppercase">
            System Architecture
          </h3>
        </div>
        <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium">
          Layer Breakdown
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="p-3 bg-[#07080c]/80 border border-white/10 rounded-xl space-y-1">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider block">
            Layer 0 — WebGL 3D Canvas
          </span>
          <span className="text-cyan-400 font-bold block">
            Three.js + R3F GPU Render Thread
          </span>
          <span className="text-gray-500 text-[11px] block">
            Isolated via React.memo with 0 DOM re-render leakage.
          </span>
        </div>

        <div className="p-3 bg-[#07080c]/80 border border-white/10 rounded-xl space-y-1">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider block">
            Layer 10 — HTML5 UI Shell
          </span>
          <span className="text-purple-400 font-bold block">
            Semantic DOM + Tailwind CSS v4
          </span>
          <span className="text-gray-500 text-[11px] block">
            Persistent flexbox navigation & input shield.
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-gray-400">
        <span>Target Refresh Rate:</span>
        <span className="text-emerald-400 font-medium">120 FPS Active</span>
      </div>
    </div>
  )
})
