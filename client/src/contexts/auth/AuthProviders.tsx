import React, { useState } from "react";
import { UserTypes, AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../alert/AlertContext";
import axios from "axios";

const AuthProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const ipAddress = process.env.REACT_APP_IP_ADDRESS || "";
    const navigation = useNavigate();
    const { showAlertFN } = useAlertContext();

    // State : Manage User Data
    const [user, setUser] = useState<UserTypes | null>(null);

    // State : Manage Token
    const [token, setToken] = useState<string>("");

    // Function : Handle Signup
    const handleSignupFN = async (username: string, fullName: string, emailAddress: string, password: string) => {

        try {

        } catch (error: any) {
            console.log("Signup error :", error);
            showAlertFN(error)
        }
    }

    // Function : Handle Login
    const handleLoginFN = async (userInput: string, password: string) => {

        try {

        } catch (error: any) {
            console.log("Login error :", error);
            showAlertFN(error)
        }
    }

    return (
        <AuthContext.Provider value={{ ipAddress, user, token, handleSignupFN, handleLoginFN }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProviders;