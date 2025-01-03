import React from "react";
import "../../css/alert.css";
import { useAlertContext } from "../../contexts/alert/AlertContext";

const Alert: React.FC = () => {
    const { message } = useAlertContext();

    return (
        <div className={`alert-component-element ${message ? "alert-show-coponent" : ""}`}>{message}</div>
    );
}

export default Alert;