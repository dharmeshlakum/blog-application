import React, { useEffect, useState } from "react";
import "../css/authenticationPage.css";
import { useAlertContext } from "../contexts/alert/AlertContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth/AuthContext";

// Interface : Defines For Data
interface FormData {
    userInput: string;
    password: string;
}

const Login: React.FC = () => {

    const navigation = useNavigate();
    const { handleLoginFN, token, user } = useAuthContext();
    const { showAlertFN } = useAlertContext();

    // State : Manage Form Data
    const [formData, setFormData] = useState<FormData>({
        userInput: "",
        password: ""
    });

    // State : Manage Password Visibility
    const [passVisibility, setPassVisibility] = useState<boolean>(false);

    // Function : Handle Change Event
    const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    }

    // Function : handle Submit Event
    const handleSubmitEvent = () => {
        if (!formData.userInput || !formData.password) {
            showAlertFN("All fields are required !");
            return
        }

        handleLoginFN(formData.userInput, formData.password);
    }

    // Effect : Check That User Is Not Already Login
        useEffect(() => {
            if (token && user) {
                navigation("/")
    
            } else {
                const localStorageData = {
                    token: localStorage.getItem("token"),
                    user: localStorage.getItem("user")
                }
    
                if (localStorageData.token && localStorageData.user) {
                    navigation("/")
                }
            }
            // eslint-disable-next-line
        }, []);

    return (
        <div className="auth-page-container">
            <div className="auth-container">
                <h1 className="auth-heading">Login With BlogNest</h1>
                <div className="form-content-wrapper">
                    <div className="input-wrapper-container">
                        <label htmlFor="login-user-input">Username | Email Address :</label>
                        <input
                            type="text"
                            className="input-field"
                            name="userInput"
                            value={formData.userInput}
                            onChange={(event) => handleChangeEvent(event)}
                            id="login-user-input"
                            autoComplete="off"
                            placeholder="Enter your username or email address..."
                        />
                    </div>
                    <div className="input-wrapper-container">
                        <label htmlFor="login-password">Password :</label>
                        <input
                            type={passVisibility ? "text" : "password"}
                            className="input-field"
                            name="password"
                            value={formData.password}
                            onChange={(event) => handleChangeEvent(event)}
                            id="login-password"
                            autoComplete="off"
                            placeholder="Enter your Password Here..."
                        />
                        <button
                            onClick={() => setPassVisibility(!passVisibility)}
                            className="password-visibility-btn">
                            <i className={`fa-solid ${passVisibility ? "fa-eye" : "fa-eye-slash"}`}></i>
                        </button>
                    </div>
                    <Link to="/forget-password" className="forget-password-link">Forget Password?</Link>
                    <button
                        type="button"
                        onClick={handleSubmitEvent}
                        className="submit-btn">
                        Login
                    </button>
                    <p className="redirection-link-element">Don't have an account ?<Link to="/auth/signup" className="redirection-link-element-inner">Create Account</Link></p>
                </div>
            </div>
        </div>
    );
}
export default Login;