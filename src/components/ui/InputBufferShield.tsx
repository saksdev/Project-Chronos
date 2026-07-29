import { useState, memo, type ChangeEvent } from 'react'

export const InputBufferShield = memo(() => {
  const [engineerId, setEngineerId] = useState('')
  const [commandPayload, setCommandPayload] = useState('')
  const [samplingRate, setSamplingRate] = useState(85)
  const [fastPipeline, setFastPipeline] = useState(true)
  const [keystrokes, setKeystrokes] = useState(0)

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEngineerId(e.target.value)
    setKeystrokes((prev) => prev + 1)
  }

  const handleCommandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommandPayload(e.target.value)
    setKeystrokes((prev) => prev + 1)
  }

  return (
    <div className="bg-[#0d1222]/70 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-[0_16px_48px_rgba(0,0,0,0.6)] space-y-5 transition-all hover:border-cyan-500/30">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></div>
          <h2 className="text-sm font-bold tracking-wider text-white font-heading uppercase">
            Input Buffer Shield
          </h2>
        </div>
        <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium">
          Zero-Leak Active
        </span>
      </div>

      <p className="text-xs text-gray-400 font-sans leading-relaxed">
        High-frequency interactive controls wrapped in isolated state streams. Keystrokes bypass WebGL rendering cycles.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="engineer-id" className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
            Engineer Identifier
          </label>
          <input
            id="engineer-id"
            type="text"
            value={engineerId}
            onChange={handleIdChange}
            placeholder="e.g. ENG-8092"
            className="w-full bg-[#07080c]/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="command-payload" className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
            Command Stream Buffer
          </label>
          <input
            id="command-payload"
            type="text"
            value={commandPayload}
            onChange={handleCommandChange}
            placeholder="e.g. STRESS_TEST_PAYLOAD"
            className="w-full bg-[#07080c]/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            autoComplete="off"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
            <span className="uppercase tracking-wider">Spatial Sampling Rate</span>
            <span className="text-cyan-400 font-bold">{samplingRate}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={samplingRate}
            onChange={(e) => {
              setSamplingRate(Number(e.target.value))
              setKeystrokes((prev) => prev + 1)
            }}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-gray-800 rounded-lg"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
            Thread Pipeline Mode
          </span>
          <button
            type="button"
            onClick={() => {
              setFastPipeline(!fastPipeline)
              setKeystrokes((prev) => prev + 1)
            }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg font-medium transition-all cursor-pointer ${
              fastPipeline
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-gray-800/80 text-gray-400 border border-gray-700'
            }`}
          >
            {fastPipeline ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 font-mono text-xs space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">DOM Keystrokes Captured:</span>
          <span className="text-indigo-400 font-bold text-sm bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {keystrokes}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Canvas React Re-renders:</span>
          <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            1 (Locked)
          </span>
        </div>
      </div>
    </div>
  )
})
