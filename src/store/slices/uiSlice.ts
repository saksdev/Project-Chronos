import { type StateCreator } from 'zustand'

export interface UiSlice {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  activeTab: 'shield',
  setActiveTab: (tab) => set({ activeTab: tab }),

  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) =>
    set((state) => ({
      isMobileMenuOpen: typeof open === 'function' ? open(state.isMobileMenuOpen) : open,
    })),
})
