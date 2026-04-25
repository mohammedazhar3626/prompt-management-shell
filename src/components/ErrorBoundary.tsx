import React from "react";

type Props = {
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
    error: any;
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "30px", textAlign: "center" }}>
                    <h1>:rotating_light: Something went wrong</h1>
                    <p style={{ color: "red" }}>
                        {this.state.error?.message}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            cursor: "pointer",
                        }}
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;