import { type StateCreator } from 'zustand'

export interface SettingsSlice {
  targetFps: number
  setTargetFps: (fps: number) => void
  cameraFov: number
  setCameraFov: (fov: number) => void
  renderScale: number
  setRenderScale: (scale: number) => void
  vsyncEnabled: boolean
  setVsyncEnabled: (enabled: boolean) => void
  hardwareAccel: boolean
  setHardwareAccel: (accel: boolean) => void
  resetSettings: () => void
}

const DEFAULT_SETTINGS = {
  targetFps: 120,
  cameraFov: 48,
  renderScale: 1.5,
  vsyncEnabled: true,
  hardwareAccel: true,
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  ...DEFAULT_SETTINGS,

  setTargetFps: (fps) => set({ targetFps: fps }),
  setCameraFov: (fov) => set({ cameraFov: fov }),
  setRenderScale: (scale) => set({ renderScale: scale }),
  setVsyncEnabled: (enabled) => set({ vsyncEnabled: enabled }),
  setHardwareAccel: (accel) => set({ hardwareAccel: accel }),

  resetSettings: () => set({ ...DEFAULT_SETTINGS }),
})
