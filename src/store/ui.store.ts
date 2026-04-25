import { create } from "zustand"

type UIState = {
    loading: boolean
    showLoader: () => void
    hideLoader: () => void
}

export const useUI = create<UIState>((set) => ({
    loading: false,
    showLoader: () => set({ loading: true }),
    hideLoader: () => set({ loading: false })
}))