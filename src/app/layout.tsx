import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useUI } from "../store/ui.store";

import "./layout.scss"

export default function Layout() {
    const location = useLocation()
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { loading, showLoader, hideLoader } = useUI()

    useEffect(() => {
        showLoader()
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            hideLoader()
        }, 1000)
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [location.pathname])

    return (
        <div className="layout">
            <div className="layout__sidebar">
                <Sidebar />
            </div>
            <div className="layout__content">
                <div className="layout__header">
                    <Header />
                </div>
                <div className="layout__main">
                    <Outlet />
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}