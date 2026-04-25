import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

import Layout from "../app/layout"
import Login from "../components/login/Login"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import Unauthorized from "../modules/Unauthorized"

import Settings from "../modules/settings/Settings"

import { useAuth } from "../store/auth.store"

//MFE's
const Playground = lazy(() => import("playground/Playground"))
const SavedPromptDetail = lazy(() => import("playground/SavedPromptDetail"))

const Templates = lazy(() => import("templates/Templates"))
const Evaluation = lazy(() => import("evaluation/Evaluation"))

//Local Navigation
import { useParams } from "react-router-dom"
const SavedPromptWrapper = () => {
    const { id } = useParams()
    return <SavedPromptDetail id={id} />
}


const RootRedirect = () => {
    const { user, hasHydrated } = useAuth()

    if (!hasHydrated) return null
    return user
        ? <Navigate to="/playground" replace />
        : <Navigate to="/login" replace />
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <RootRedirect />
            },
            {
                path: "playground",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "developer", "user"]}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Playground />
                        </Suspense>
                    </ProtectedRoute>
                ),
                handle: { title: "Prompt Playground" },
                errorElement: <div>Route Error Occurred</div>
            },
            {
                path: "templates",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "developer", "user"]}>
                        <Templates />
                    </ProtectedRoute>
                ),
                handle: { title: "Template Library" }
            },
            {
                path: "evaluation",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "developer"]}>
                        <Evaluation />
                    </ProtectedRoute>
                ),
                handle: { title: "Evaluation Reports" }
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Settings />
                    </ProtectedRoute>
                ),
                handle: { title: "Settings" }
            },
            {
                path: "/saved-prompts/:id",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "developer", "user"]}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SavedPromptWrapper />
                        </Suspense>
                    </ProtectedRoute>
                ),
                handle: { title: "Saved Prompt" }
            },
            {
                path: "unauthorized",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "developer", "user"]}>
                        <Unauthorized />
                    </ProtectedRoute>
                ),
                handle: { title: "Unauthorized" }
            },
            {
                path: "*",
                element: <RootRedirect />
            }
        ]
    }
])