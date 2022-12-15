import { useState, createContext, useContext  } from "react"

const ThemeContext = createContext()

export function ThemeProvider(props) {
    const themeLocalStorage = localStorage.getItem('theme')
    const [theme, setTheme] = useState(themeLocalStorage === null ? 'dark' : themeLocalStorage)

    function changeTheme(themeReceived) {
        if(themeReceived !== theme) {
            setTheme(themeReceived)
            localStorage.setItem('theme', themeReceived)
        }
    }

    return(
        <ThemeContext.Provider value={{theme, changeTheme}}>
            { props.children }
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)

    return context
}