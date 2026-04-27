import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

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
            logout: () => {
                sessionStorage.removeItem("auth-storage")
                set({ user: null })
            },
            setHasHydrated: (state) => set({ hasHydrated: state })
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)