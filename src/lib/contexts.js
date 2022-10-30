import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Context provider for authentication
export const AuthProvider = ({ children }) => {
    const [authName, setAuthName] = useState("");
    const [authEmail, setAuthEmail] = useState("");

    useEffect(() => {
        setAuthEmail(sessionStorage.getItem('email') || "");
        setAuthName(sessionStorage.getItem("name") || "");
    }, []);

    const updateAuth = ({ email = '', name = '' }) => {
        setAuthEmail(email);
        setAuthName(name);
        if(!email && !name) sessionStorage.clear();
        else {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('name', name);
        }
    }

    return <AuthContext.Provider value={{ authName, authEmail, updateAuth }}>
        {children}
    </AuthContext.Provider>
}