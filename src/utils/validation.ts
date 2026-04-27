export const validateUsername = (username: string) => {
    if (!username) return "Username is required"
    if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
        return "Min 3 chars, no spaces"
    }
    return ""
}

export const validatePassword = (password: string) => {
    if (!password) return "Password is required"
    if (password.length < 4) {
        return "Password must be at least 4 characters"
    }
    return ""
}