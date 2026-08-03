import { useState, useEffect, useRef, memo, type ChangeEvent } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { CustomSlider } from './CustomSlider'
import { ToggleSwitch } from './ToggleSwitch'
import { TooltipOverlay } from './TooltipOverlay'

interface ProfileOption {
  id: string
  label: string
  fps: number
  scale: number
}

const PROFILES: ProfileOption[] = [
  { id: 'ultra', label: 'Ultra High-End (120 FPS)', fps: 120, scale: 1.5 },
  { id: 'balanced', label: 'Balanced Performance (60 FPS)', fps: 60, scale: 1.0 },
  { id: 'saver', label: 'Power Saver (30 FPS)', fps: 30, scale: 0.7 },
]

export const SettingsForm = memo(() => {
  const targetFps = useAppStore((s) => s.targetFps)
  const setTargetFps = useAppStore((s) => s.setTargetFps)
  const cameraFov = useAppStore((s) => s.cameraFov)
  const setCameraFov = useAppStore((s) => s.setCameraFov)
  const renderScale = useAppStore((s) => s.renderScale)
  const setRenderScale = useAppStore((s) => s.setRenderScale)
  const vsyncEnabled = useAppStore((s) => s.vsyncEnabled)
  const setVsyncEnabled = useAppStore((s) => s.setVsyncEnabled)
  const hardwareAccel = useAppStore((s) => s.hardwareAccel)
  const setHardwareAccel = useAppStore((s) => s.setHardwareAccel)
  const resetSettings = useAppStore((s) => s.resetSettings)

  const [selectedProfile, setSelectedProfile] = useState('ultra')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const scaleBadgeRef = useRef<HTMLSpanElement>(null)
  const isFpsValid = targetFps >= 30 && targetFps <= 240
  const isFovValid = cameraFov >= 30 && cameraFov <= 120

  useEffect(() => {
    const unsub = useAppStore.subscribe(
      (state) => state.renderScale,
      (newScale) => {
        if (scaleBadgeRef.current) {
          scaleBadgeRef.current.innerText = `${newScale.toFixed(1)}x`
        }
      }
    )
    return () => unsub()
  }, [])

  const handleFpsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTargetFps(Number(e.target.value))
  }

  const handleFovChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCameraFov(Number(e.target.value))
  }

  const handleSelectProfile = (profile: ProfileOption) => {
    setSelectedProfile(profile.id)
    setTargetFps(profile.fps)
    setRenderScale(profile.scale)
    setDropdownOpen(false)
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-[#0d1222]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-[0_16px_48px_rgba(0,0,0,0.6)] space-y-5 transition-all hover:border-cyan-500/30"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></div>
          <h2 className="text-sm font-bold tracking-wider text-white font-heading uppercase">
            Engine Settings & Slices
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetSettings}
            className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            Reset Baseline
          </button>
          <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium">
            Modular Slices
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="flex items-center mb-1.5">
            <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">
              Performance Profile Preset
            </label>
            <TooltipOverlay content="Pre-configured target frame-rate and render scale multiplier settings." />
          </div>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-[#07080c]/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono flex items-center justify-between focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <span>
              {PROFILES.find((p) => p.id === selectedProfile)?.label || 'Custom Preset'}
            </span>
            <span className="text-gray-400 text-[10px]">{dropdownOpen ? '▲' : '▼'}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0d1222] border border-white/15 rounded-xl shadow-2xl z-30 overflow-hidden space-y-0.5 p-1">
              {PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleSelectProfile(profile)}
                  className={`w-full text-left px-3 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                    selectedProfile === profile.id
                      ? 'bg-cyan-500/20 text-cyan-400 font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {profile.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
            <div className="flex items-center">
              <span className="uppercase tracking-wider">Target Refresh Benchmark</span>
              <TooltipOverlay content="Defines target GPU frame rendering rate limit (30-240 FPS)." />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{targetFps} FPS</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                  isFpsValid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {isFpsValid ? 'VALID' : 'OUT OF RANGE'}
              </span>
            </div>
          </div>
          <input
            id="fps-target"
            type="number"
            min="30"
            max="240"
            value={targetFps}
            onChange={handleFpsChange}
            className={`w-full bg-[#07080c]/80 border rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none transition-all ${
              isFpsValid
                ? 'border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                : 'border-rose-500/50 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
            }`}
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
            <div className="flex items-center">
              <span className="uppercase tracking-wider">Camera FOV Lens Angle</span>
              <TooltipOverlay content="Adjusts 3D perspective camera field of view angle (30°-120°)." />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{cameraFov}°</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                  isFovValid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {isFovValid ? 'VALID' : 'OUT OF RANGE'}
              </span>
            </div>
          </div>
          <input
            id="camera-fov"
            type="number"
            min="30"
            max="120"
            value={cameraFov}
            onChange={handleFovChange}
            className={`w-full bg-[#07080c]/80 border rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none transition-all ${
              isFovValid
                ? 'border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                : 'border-rose-500/50 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50'
            }`}
          />
        </div>

        <CustomSlider
          label="Render Scale Multiplier"
          min={0.5}
          max={2.0}
          step={0.1}
          value={renderScale}
          unit="x"
          tooltip="Adjusts internal WebGL render resolution scale multiplier."
          onChange={setRenderScale}
        />

        <div className="pt-2 border-t border-white/10 space-y-2">
          <ToggleSwitch
            label="VSync Lock Simulation"
            enabled={vsyncEnabled}
            onToggle={setVsyncEnabled}
            activeColor="cyan"
            tooltip="Synchronizes rendering cycles with target screen refresh rate."
          />

          <ToggleSwitch
            label="GPU Acceleration Pipeline"
            enabled={hardwareAccel}
            onToggle={setHardwareAccel}
            activeColor="emerald"
            tooltip="Enables WebGL hardware acceleration pipeline for smooth 120 FPS rendering."
          />
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 font-mono text-xs space-y-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
          Transient Direct Subscriber Telemetry:
        </span>
        <div className="p-3 bg-[#07080c]/90 rounded-xl border border-white/5 text-[11px] text-gray-300 space-y-1">
          <div>Profile: <span className="text-cyan-400 font-bold uppercase">{selectedProfile}</span></div>
          <div>Direct Sub Scale: <span ref={scaleBadgeRef} className="text-emerald-400 font-bold">{renderScale.toFixed(1)}x</span></div>
          <div>Hardware Accel: <span className={hardwareAccel ? 'text-emerald-400' : 'text-gray-500'}>{hardwareAccel ? 'ACTIVE' : 'DISABLED'}</span></div>
        </div>
      </div>
    </form>
  )
})
