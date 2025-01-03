import React, { useState } from "react";
import { AlertContext } from "./AlertContext";

const AlertProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // State : Manage Alert Message
    const [message, setMessage] = useState<string>("");

    // Function : Show Alert For 2 Seconds
    const showAlertFN = (message: string) => {
        setMessage(message);

        // After 2 Second Remove The Alert
        setTimeout(() => {
            setMessage("");

        }, 2000)
    }

    return (
        <AlertContext.Provider value={{ message, showAlertFN }}>
            {children}
        </AlertContext.Provider>
    );
}

export default AlertProviders;