import { create } from 'zustand'

interface AppState {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
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
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'shield',
  setActiveTab: (tab) => set({ activeTab: tab }),

  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) =>
    set((state) => ({
      isMobileMenuOpen: typeof open === 'function' ? open(state.isMobileMenuOpen) : open,
    })),

  targetFps: 120,
  setTargetFps: (fps) => set({ targetFps: fps }),

  cameraFov: 48,
  setCameraFov: (fov) => set({ cameraFov: fov }),

  renderScale: 1.5,
  setRenderScale: (scale) => set({ renderScale: scale }),

  vsyncEnabled: true,
  setVsyncEnabled: (enabled) => set({ vsyncEnabled: enabled }),

  hardwareAccel: true,
  setHardwareAccel: (accel) => set({ hardwareAccel: accel }),
}))
