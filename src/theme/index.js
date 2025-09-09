import { useEffect } from "react"


const match = window.matchMedia('(prefers-color-scheme: dark)')

export const Theme = () => {
    console.log('hehe')
    useEffect(() => {
        match.addEventListener("change", changeTheme("auto"))

        return () => {
            match.removeEventListener("change", changeTheme)
        }
    }, [])
}

export const changeTheme = (theme) => {
    if(theme === 'auto') {
        match.matches ? 
        document.body.setAttribute("data-theme", "dark") : document.body.setAttribute("data-theme", "light")
    } else {
        document.body.setAttribute("data-theme", theme)
    }

}

if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light")
}

const themeColor = localStorage.getItem("theme");

changeTheme(themeColor);

