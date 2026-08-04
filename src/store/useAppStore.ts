import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createUiSlice, type UiSlice } from './slices/uiSlice'
import { createSettingsSlice, type SettingsSlice } from './slices/settingsSlice'

export type AppStore = UiSlice & SettingsSlice

export const useAppStore = create<AppStore>()(
  persist(
    (...args) => ({
      ...createUiSlice(...args),
      ...createSettingsSlice(...args),
    }),
    {
      name: 'chronos-app-store',
      partialize: (state) => ({
        targetFps: state.targetFps,
        cameraFov: state.cameraFov,
        renderScale: state.renderScale,
        vsyncEnabled: state.vsyncEnabled,
        hardwareAccel: state.hardwareAccel,
      }),
    }
  )
)
