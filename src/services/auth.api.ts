import users from "../mock/users.json"

export const login = async (username: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500))

    const user = users.find(
        (u) => u.username === username && u.password === password
    )

    if (!user) {
        throw new Error("Invalid credentials")
    }

    return user
}