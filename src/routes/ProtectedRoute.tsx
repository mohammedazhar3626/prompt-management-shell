import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth.store"

const ProtectedRoute = ({ children, allowedRoles }: any) => {
    const { user, hasHydrated } = useAuth()

    if (!hasHydrated) {
        return null
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute