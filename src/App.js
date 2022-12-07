/**
 * CS4287 Project
 * Author: Zechuan Xiao
 * Email: zechuan.xiao@vanderbilt.edu
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./lib/contexts";
import { AuthPage } from "./pages/AuthPage";
import { Home } from "./pages/Home";

export const App = () => {
    // set up page background color
    useEffect(() => {
        document.body.style.backgroundColor = '#E4E4E4';
    }, []);
    return <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true}/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/Home' element={<Home />} />
                <Route path='*' element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
}