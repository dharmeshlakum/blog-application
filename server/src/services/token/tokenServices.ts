import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// Funtion : Create Token
const generateTokenFN = (payload: object): string => {

    try {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as Secret, { expiresIn: "7d" });
        return token;

    } catch (error: any) {
        console.log("Token generate function error :", error);
        return error;
    }
}

// Interface : Defines Return Types
interface Returntypes {
    isValid: boolean;
    token: JwtPayload | null;
    error: string | null
}

// Function : Verify Token
const tokenVerificationFN = (token: string): Returntypes => {

    try {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret) as JwtPayload;
        return {
            isValid: true,
            token: verification,
            error: null
        }

    } catch (error: any) {
        console.log("Token verification function error :", error);
        return {
            isValid: false,
            token: null,
            error: error?.message
        }

    }
}

export {
    generateTokenFN,
    tokenVerificationFN
}