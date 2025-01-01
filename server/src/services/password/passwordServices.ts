import bcrypt from "bcrypt";

// Function : Encrypt The Password
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

// Function : Compare Password And hashcode
const passwordVerificationFN = async (password: string, hashcode: string): Promise<boolean> => {

    try {
        const verification = await bcrypt.compare(password, hashcode);
        return verification;

    } catch (error: any) {
        console.log("Password verification function error :", error);
        return error;
    }
}

// Interface : Defines Return Types
interface ReturnTypes{
    isValid: boolean;
    message: string;
}

// Function: Validate Password
const passwordValidationFN = (password: string):ReturnTypes =>{

    if(password.length < 8){
        return{ 
            isValid: false,
            message: "Password length should be greater than 8 characters !"
        }
    }

    if(!/[a-zA-z]/.test(password)){
        return{
            isValid: false,
            message: "Password must contain one character and one numerical value !"
        }
    }

    if(!/[0-9]/.test(password)){
        return{
            isValid: false,
            message: "Password must contain one character and one numerical value !"
        }
    }

    return{
        isValid: true,
        message: "Password is valid !"
    }
}

export {
    passwordHashingFN,
    passwordVerificationFN,
    passwordValidationFN
}