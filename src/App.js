import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthPage } from "./pages/AuthPage";
import { Home } from "./pages/Home";

export const App = () => {
    return <>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true}/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='/Home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
}