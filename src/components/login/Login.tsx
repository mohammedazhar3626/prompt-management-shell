import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/auth.api"
import { useAuth } from "../../store/auth.store"
import { useUI } from "../../store/ui.store"
import "./Login.scss"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setUser } = useAuth()
    const { showLoader } = useUI()

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            const user = await login(username, password)
            const { password: _password, ...safeUser } = user || {}
            setUser(safeUser)
            showLoader()
            navigate("/playground", { replace: true })
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="login">
            <div className="login__card">
                <h2 className="login__title">Prompt Platform Login</h2>
                <div className="login__fields-sec">
                    <div className="login__field">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="login__field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    {error && (
                        <div className="login__error">{error}</div>
                    )}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="login__btn"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Login