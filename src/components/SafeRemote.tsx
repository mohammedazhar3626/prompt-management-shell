import React, { Suspense } from "react"

type Props = {
    children: React.ReactNode
    fallback?: React.ReactNode
}

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: any) {
        console.error("MFE crashed:", error)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div>Module failed to load</div>
        }

        return this.props.children
    }
}

export const SafeRemote = ({ children, fallback }: Props) => {
    return (
        <ErrorBoundary fallback={fallback}>
            <Suspense fallback={<div>Loading module...</div>}>
                {children}
            </Suspense>
        </ErrorBoundary>
    )
}