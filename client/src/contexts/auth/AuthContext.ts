import { createContext, useContext } from "react";

// Interface : Defines User Object Types
export interface UserTypes {
    _id: string;
    fullName: string;
    username: string;
    profilePicture: string;
}

// Interface : Defines Context Types
interface ContextTypes {
    user: UserTypes | null;
    token: string;
    ipAddress: string;
    handleSignupFN: (username: string, fullName: string, emailAddress: string, password: string) => void;
    handleLoginFN: (userInput: string, password: string) => void;
}

const AuthContext = createContext<ContextTypes | undefined>(undefined);
const useAuthContext = () => {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Can't use context outside of AuthContext !");
    }

    return context;
}

export {
    AuthContext,
    useAuthContext
}