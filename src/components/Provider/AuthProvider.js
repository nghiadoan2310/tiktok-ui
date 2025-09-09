import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [isCurrentUser, setIsCurrentUser] = useState(null)
    
    const tokenStr = JSON.parse(localStorage.getItem('token')) ?? '';
    const userData = JSON.parse(localStorage.getItem('user_data')) ?? '';

    useEffect(() => {
        //khi người dùng đăng nhập
        if (tokenStr && userData) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [tokenStr, userData])

    const value = {
        isCurrentUser,
        setIsCurrentUser,
        tokenStr,
        userData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;