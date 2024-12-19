import { Request, Response, NextFunction } from "express";
import userModel from "../../models/user/userCollection";
import { passwordValidationFN } from "../../services/password/passwordServices";
import errorResponseHandlingFN from "../error/errorResponseHandling";

// Middleware : Signup Validation
const signupValidationMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, emailAddress, password, fullName } = req.body;
        const regExp = /gmail\.com$/

        // Check That All Data Coming From The Front-end Side
        if (!username || !emailAddress || !password || !fullName) {
            errorResponseHandlingFN(res, "All Fields are required !", 400);
            return;
        }

        // Check That Email Address Is Correct
        if (!regExp.test(emailAddress)) {
            errorResponseHandlingFN(res, "Invalid Email Address !", 400);
            return;
        }

        // Check That Password is Valid
        const validation = passwordValidationFN(password);
        if (!validation.isValid) {
            errorResponseHandlingFN(res, validation.message, 400);
            return;
        }

        // Check That Username Is Available
        const usernameData = await userModel.findOne({ username });
        if (usernameData) {
            errorResponseHandlingFN(res, "Username is already taken! choose other username to continue.", 409);
            return;
        }

        // Check That Email Address Is Not Already Registerd 
        const emailData = await userModel.findOne({ emailAddress, isDeleted: false });
        if (emailData) {
            errorResponseHandlingFN(res, "Email address is already registred !", 409);
            return;
        }

        next(); // move to next middleware

    } catch (error: any) {
        console.log("Signup validation middleware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export default signupValidationMW;