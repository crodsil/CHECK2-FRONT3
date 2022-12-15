import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider(props) {
    const tokenLocalStorage = localStorage.getItem('token')
    const [token, setToken] = useState(tokenLocalStorage)

    localStorage.setItem('token', token)

    return(
        <AuthContext.Provider value={{token, setToken}}>
            { props.children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}