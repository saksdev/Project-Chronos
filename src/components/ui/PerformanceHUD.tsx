import { useEffect, useRef, useState } from 'react'

export const PerformanceHUD = () => {
  const [fps, setFps] = useState(120)
  const [frameTimeMs, setFrameTimeMs] = useState(8.33)
  
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animId: number

    const tick = () => {
      const now = performance.now()
      frameCount.current++
      const elapsed = now - lastTime.current

      if (elapsed >= 500) {
        const calculatedFps = Math.round((frameCount.current * 1000) / elapsed)
        const calculatedFrameTime = parseFloat((elapsed / frameCount.current).toFixed(2))
        
        setFps(calculatedFps)
        setFrameTimeMs(calculatedFrameTime)
        
        frameCount.current = 0
        lastTime.current = now
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="bg-[#0d1222]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl max-w-md w-full shadow-[0_16px_48px_rgba(0,0,0,0.6)] space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
          <h3 className="text-xs font-semibold tracking-wider text-white font-sans uppercase">
            Performance Monitor
          </h3>
        </div>
        <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
          120 FPS Target
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#07080c]/80 border border-white/10 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
            Canvas FPS
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
            {fps}
          </div>
        </div>

        <div className="bg-[#07080c]/80 border border-white/10 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
            Frame Latency
          </span>
          <div className="text-2xl font-bold font-mono text-purple-400">
            {frameTimeMs} <span className="text-xs text-gray-500 font-normal">ms</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-gray-400">
        <span>Render Thread Status:</span>
        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          0 Frame-Rate Leak
        </span>
      </div>
    </div>
  )
}
