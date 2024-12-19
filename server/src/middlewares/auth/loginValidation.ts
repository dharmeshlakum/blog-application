import { Request, Response, NextFunction } from "express";
import userModel, { IUsers } from "../../models/user/userCollection";
import { passwordVerificationFN } from "../../services/password/passwordServices";
import loginModel from "../../models/login/loginCollection";
import { generateTokenFN } from "../../services/token/tokenServices";
import errorResponseHandlingFN from "../error/errorResponseHandling";
import getClientInfoFN from "../../services/request/clientInforServices";

// Interface : Implement Custom Value To Request
interface CustomRequest extends Request {
    user?: IUsers
}

// Middleware : Login Validation
const loginValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { userInput, password } = req.body;

        // Check That All Data Is Coming From The Front-end Side
        if (!userInput || !password) {
            errorResponseHandlingFN(res, "All fields are required !", 400);
            return;
        }

        // check for the user
        const user = await userModel.findOne({
            $or: [
                { username: userInput, isDeleted: false },
                { emailAddress: userInput, isDeleted: false }
            ]
        });

        if (!user) {
            errorResponseHandlingFN(res, "Invalid username or email address !", 400);
            return;
        }

        // check that password correct
        const verification = await passwordVerificationFN(password, user.password);
        if (!verification) {
            errorResponseHandlingFN(res, "Wrong Password !", 401);
            return;
        }

        // Check For The Previous Login Data
        const loginData = await loginModel.findOne({ userId: user._id });

        if (loginData) {
            const currentClientData = getClientInfoFN(req);

            // Check That Current User Is Authorized
            if (currentClientData.ipAddress === loginData.ipAddress && currentClientData.userAgent === loginData.userAgent) {
                const token = generateTokenFN({ id: user._id, loginAt: Date.now(), username: user.username });

                // Update The Document
                await loginModel.updateOne({ _id: loginData._id }, {
                    $set: {
                        token,
                        loginAt: Date.now()
                    }
                });

                res.status(200).json({
                    success: false,
                    token,
                    message: `${user.username} login successfully !`,
                    user: {
                        id: user._id,
                        username: user.username,
                        fullName: user.fullName,
                        profilePicture: user.profilePicture
                    }
                });
            }

        } else {
            req.user = user;
            next() // move to the next middleware
        }

    } catch (error: any) {
        console.log("Login validation error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export default loginValidationMW;