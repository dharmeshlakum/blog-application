import { Request, Response, NextFunction } from "express";
import { tokenVerificationFN } from "../../services/token/tokenServices";
import errorResponseHandlingFN from "../error/errorResponseHandling";
import loginModel from "../../models/login/loginCollection";
import { JwtPayload } from "jsonwebtoken";

// Interface : Custom Request To Implement Token In Request
interface CustomRequest extends Request {
    token?: JwtPayload;
}

// Middleware : Verify Token
const authTokenVerificationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        // Extract Token From The Request
        const token = req.header("auth-token");
        if (!token) {
            errorResponseHandlingFN(res, "Token is not awailable !", 401);
            return;
        }

        // Verify Token
        const verification = tokenVerificationFN(token);
        if (verification.isValid && verification.token) {

            //Check That Token Is Not Expired 
            const { exp, id } = verification.token;
            if (exp && exp * 1000 > Date.now()) {

                // Check For The Login Data
                const loginData = await loginModel.findOne({ userId: id });
                if (loginData) {
                    req.token = verification.token;
                    next(); // move to the next middleware

                } else {
                    errorResponseHandlingFN(res, "Unauthorized token...", 401);
                    return;
                }

            } else {
                errorResponseHandlingFN(res, "Token is expired !", 401);
                return;
            }

        } else {
            errorResponseHandlingFN(res, "Invalid token...", 401);
            return;
        }

    } catch (error: any) {
        console.log("Token verification middleware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export default authTokenVerificationMW;