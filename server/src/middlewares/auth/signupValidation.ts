import { Request, Response, NextFunction } from "express";
import userModel from "../../models/user/userCollection";
import { passwordValidationFN } from "../../services/password/passwordServices";
import responseErrorFN from "../error/responseErrorHandling";

// Middleware : Signup Validation
const signupValidationMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Extract Data From The Request Body
        const { username, fullName, emailAddress, password } = req.body;
        const regExp = /@gmail\.com$/;

        // Check That All Data Is Coming From The Client Side
        if (!username || !fullName || !emailAddress || !password) {
            responseErrorFN(res, "All fields are required !", 400);
            return;
        }

        // Check That Email Address Is Valid
        if (!regExp.test(emailAddress)) {
            responseErrorFN(res, "Invalid email address !", 400);
            return;
        }

        // Check That Password Is Valid
        const passValidation = passwordValidationFN(password);
        if (!passValidation.isValid) {
            responseErrorFN(res, passValidation.message, 400);
            return;
        }

        // Check That Username Is Awailable
        const usernameData = await userModel.findOne({ username });
        if (usernameData) {
            responseErrorFN(res, "Username is already registred !", 409);
            return;
        }

        // Check That Email Address Is Not Registred
        const emailData = await userModel.findOne({ emailAddress });
        if (emailData) {
            responseErrorFN(res, "Email address is already registred !", 409);
            return;
        }

        next(); // Move To The Next Middleware

    } catch (error: any) {
        console.log("Signup validation middleware error :", error);
        responseErrorFN(res, "Internal server error !", 500);
    }
}