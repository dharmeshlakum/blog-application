import React from "react";
import Alert from "../components/alert/Alert";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Navigation: React.FC = () => {

    return (
        <>
            <Alert />
            <Routes>
                <Route path="/auth/signup" element={<Signup/>} />
                <Route path="/auth/login" element={<Login/>} />
            </Routes>
        </>
    );
}

export default Navigation;