import { createContext, useState } from "react";

export const NotifyContext = createContext();

function NotifyProvider({ children }) {

    const [isNotify, setIsNotify] = useState(false);
    const [message, setMessage] = useState('');
    const [delay, setDelay] = useState(1000);

    const value = {
        isNotify,
        message,
        delay,
        setIsNotify,
        setMessage,
        setDelay,
    }

    return (
        <NotifyContext.Provider value={value}>
            {children}
        </NotifyContext.Provider>
    )
}

export default NotifyProvider;