import { useState, createContext } from 'react'

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    function toggleTheme() {
        setTheme(theme === 'light'? 'dark' : 'light');
    }

    const value = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={ value }>
            { children }
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }