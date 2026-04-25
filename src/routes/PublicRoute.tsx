import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth.store"

const PublicRoute = ({ children }: any) => {
    const { user, hasHydrated } = useAuth()
    if (!hasHydrated) {
        return null
    }

    if (user) {
        return <Navigate to="/playground" replace />
    }

    return children
}

export default PublicRoute