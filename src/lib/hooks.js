/**
 * CS4287 Project
 * Author: Zechuan Xiao
 * Email: zechuan.xiao@vanderbilt.edu
 */

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
        width: Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
        height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
    });

    const onWindowResize = () => {
        setWindowSize({
            width:Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
            height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
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

export const useCourses = () => {
    
}