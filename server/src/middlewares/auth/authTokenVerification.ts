import { Request, Response, NextFunction } from "express";
import loginModel from "../../models/login/loginCollection";
import { JwtPayload } from "jsonwebtoken";
import responseErrorFN from "../error/responseErrorHandling";
import { tokenVerificationFN } from "../../services/token/tokenServices";

// Interface : Implement Additional Information In Request
interface CustomRequest extends Request {
    token?: JwtPayload;
}

// Middleware: Auth Token Verification
const authTokenVerificationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        // Extract Token From The Header
        const token = req.header("auth-token");
        if (!token) {
            responseErrorFN(res, "Token is required !", 401);
            return;
        }

        // Verify the token
        const tokenVerify = tokenVerificationFN(token);
        if (tokenVerify.isValid && tokenVerify.token) {
            const { id, exp } = tokenVerify.token;

            // Check That Token Is Not Expired
            if (exp && exp * 1000 > Date.now()) {
                // Check For the User's Login Data
                const loginData = await loginModel.findOne({ user: id });

                if (loginData) {
                    req.token = tokenVerify.token;
                    next(); // Move To The Next Middleware 

                } else {
                    responseErrorFN(res, "Unauthorized User !", 401);
                    return;
                }

            } else {
                responseErrorFN(res, "Token is expired !", 401);
                return;
            }

        } else {
            responseErrorFN(res, "Invalid token !", 401);
            return;
        }

    } catch (error: any) {
        console.log("Auth token verification middleware error :", error);
        responseErrorFN(res, "Internal server error !", 500)
    }
}

export default authTokenVerificationMW;