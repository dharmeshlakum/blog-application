import React, { useEffect, useState } from "react";
import "../css/authenticationPage.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth/AuthContext";
import { useAlertContext } from "../contexts/alert/AlertContext";

// Interface : Defines Form Data
interface FormData {
    username: string;
    fullName: string;
    emailAddress: string;
    password: string;
    coPassword: string
}

const Signup: React.FC = () => {

    const navigation = useNavigate();
    const { handleSignupFN, token, user } = useAuthContext();
    const { showAlertFN } = useAlertContext();

    // state : Manage Form Data
    const [formData, setFormData] = useState<FormData>({
        username: "",
        fullName: "",
        emailAddress: "",
        password: "",
        coPassword: ""
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
        if (!formData.username || !formData.fullName || !formData.emailAddress || !formData.password || !formData.coPassword) {
            showAlertFN("All fields are required !");
            return
        }

        if (formData.password !== formData.coPassword) {
            showAlertFN("Password and confirm password doesn't match");
            return;
        }

        handleSignupFN(formData.username, formData.fullName, formData.emailAddress, formData.password);
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
                <h1 className="auth-heading">Signup With BlogNest</h1>
                <div className="form-content-wrapper">
                    <div className="input-wrapper-container">
                        <label htmlFor="signup-username">Username :</label>
                        <input
                            type="text"
                            className="input-field"
                            name="username"
                            value={formData.username}
                            onChange={(event) => handleChangeEvent(event)}
                            id="signup-username"
                            autoComplete="off"
                            placeholder="Choose username for your profile..."
                        />
                    </div>
                    <div className="input-wrapper-container">
                        <label htmlFor="signup-full-name">Full Name :</label>
                        <input
                            type="text"
                            className="input-field"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(event) => handleChangeEvent(event)}
                            id="signup-full-name"
                            autoComplete="off"
                            placeholder="Enter Your Name Here..."
                        />
                    </div>
                    <div className="input-wrapper-container">
                        <label htmlFor="signup-email-address">Email Address :</label>
                        <input
                            type="text"
                            className="input-field"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={(event) => handleChangeEvent(event)}
                            id="signup-email-address"
                            autoComplete="off"
                            placeholder="Enter Your Email Address Here..."
                        />
                    </div>
                    <div className="input-wrapper-container">
                        <label htmlFor="signup-password">Password :</label>
                        <input
                            type={passVisibility ? "text" : "password"}
                            className="input-field"
                            name="password"
                            value={formData.password}
                            onChange={(event) => handleChangeEvent(event)}
                            id="signup-password"
                            autoComplete="off"
                            placeholder="Enter Strong Password Here..."
                        />
                        <button
                            onClick={() => setPassVisibility(!passVisibility)}
                            className="password-visibility-btn">
                            <i className={`fa-solid ${passVisibility ? "fa-eye" : "fa-eye-slash"}`}></i>
                        </button>
                    </div>
                    <div className="input-wrapper-container">
                        <label htmlFor="signup-co-password">Confirm Password :</label>
                        <input
                            type={passVisibility ? "text" : "password"}
                            className="input-field"
                            name="coPassword"
                            value={formData.coPassword}
                            onChange={(event) => handleChangeEvent(event)}
                            id="signup-co-password"
                            autoComplete="off"
                            placeholder="Re-enter Password Here..."
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmitEvent}
                        className="submit-btn">
                        Signup
                    </button>
                    <p className="redirection-link-element">Already have an account ?<Link to="/auth/login" className="redirection-link-element-inner">Back To Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;