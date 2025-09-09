import { useContext } from "react"
import { ThemeContext } from './ThemeContext' 


function Paragraph() {
    const context = useContext(ThemeContext);

    return (
        <p className={context.theme}>
            Nội dung của này chứa 1 đoạn văn
        </p>
    )
}

export default Paragraph