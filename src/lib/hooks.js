import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SCREEN } from "./constants";
import { AuthContext } from "./contexts";

/**
 * A hook that returns metadata about client window
 * @returns {Object} an object containing metadata about client window
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window?.innerWidth ?? 1200,
        height: window?.innerHeight ?? 800,
    });

    const onWindowResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);
    
    return { 
        ...windowSize,
        type: windowSize.width < 450 ? SCREEN.MOBILE : SCREEN.WEB
    };
}

/**
 * A hook that accesses and manages AuthContext
 * @returns {Object} value of AuthContext
 */
export const useAuth = () => {
    const { authName, authEmail, updateAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    if(authEmail === '') navigate('/');
    
    return { authName, authEmail, updateAuth };
}