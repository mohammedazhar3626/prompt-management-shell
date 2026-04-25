import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id: number
    name: string
    role: string
}

type AuthState = {
    user: User | null
    hasHydrated: boolean
    setUser: (user: User) => void
    logout: () => void
    setHasHydrated: (state: boolean) => void
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            hasHydrated: false,
            setUser: (user) => {
                const { password, ...safeUser } = user as any
                set({ user: safeUser })
            },
            logout: () => set({ user: null }),
            setHasHydrated: (state) => set({ hasHydrated: state })
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)