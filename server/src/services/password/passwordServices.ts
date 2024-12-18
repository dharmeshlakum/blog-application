import bcrypt from "bcrypt";

// Function : Paaword Hashing
const passwordHashingFN = async (password: string): Promise<string> => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(password, salt);
        return hashcode;

    } catch (error: any) {
        console.log("Password hashing function error :", error);
        return error;
    }
}

// Function : Paaword Verification
const passwordVerificationFN = async (password: string, hashcode: string): Promise<boolean> => {

    try {
        const verification = await bcrypt.compare(password, hashcode);
        return verification;

    } catch (error: any) {
        console.log("Password verification function error :", error);
        return error;
    }
}

// Interface : Return Types
interface ReturnTypes {
    isValid: boolean;
    message: string;
}

// Function : Password Validation
const passwordValidationFN = (password: string): ReturnTypes => {

    // Check That Password Length Is More Then 8
    if (password.length < 8) {
        return {
            isValid: false,
            message: "Password length should be greater then 8 charcatres !"
        }
    }

    // Check That Password Must Have One Character Value
    if (!/[a-zA-Z]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain one character and one numaric value !"
        }
    }

    // Check That Password Must Have One Character Value
    if (!/[0-9]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain one character and one numaric value !"
        }
    }

    return {
        isValid: true,
        message: "Password is valid !"
    }
}

export {
    passwordHashingFN,
    passwordVerificationFN,
    passwordValidationFN
}