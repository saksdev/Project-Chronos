import { create } from 'zustand'
import { createUiSlice, type UiSlice } from './slices/uiSlice'
import { createSettingsSlice, type SettingsSlice } from './slices/settingsSlice'

export type AppStore = UiSlice & SettingsSlice

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUiSlice(...args),
  ...createSettingsSlice(...args),
}))
