import { createContext, useContext } from "react";

// Interface : Defines Context Types
interface ContextTypes {
    message: string;
    showAlertFN: (message: string) => void;
}

const AlertContext = createContext<ContextTypes | undefined>(undefined);
const useAlertContext = () => {

    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("Can't use context outside of AlertContext !");
    }

    return context;
}

export {
    AlertContext,
    useAlertContext
}