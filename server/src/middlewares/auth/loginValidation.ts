import { Request, Response, NextFunction } from "express";
import userModel, { IUsers } from "../../models/user/userCollection";
import responseErrorFN from "../error/responseErrorHandling";
import { passwordVerificationFN } from "../../services/password/passwordServices";
import { generateTokenFN } from "../../services/token/tokenServices";
import getClientInfoFN from "../../services/request/clientInformation";
import loginModel from "../../models/login/loginCollection";

// Interface : Implement Additional Information In Request
interface CustomRequest extends Request {
    user?: IUsers;
}

// Middleware : Login Validation
const loginValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        // Check That All Data Is Coming From The Client Side
        const { userInput, password } = req.body
        if (!userInput || !password) {
            responseErrorFN(res, "All fields are required !", 400);
            return;
        }

        // Check For The User
        const user = await userModel.findOne({
            $or: [
                { username: userInput, isDeleted: false },
                { emailAddress: userInput, isDeleted: false }
            ]
        });
        if (!user) {
            responseErrorFN(res, "Invalid username | email Address", 400);
            return;
        }

        // Verify Password
        const passVerification = await passwordVerificationFN(password, user.password);
        if (!passVerification) {
            responseErrorFN(res, "Wrong Password !", 401);
            return;
        }

        // Check For the Previous Login Data
        const loginData = await loginModel.findOne({ user: user._id });

        if (loginData) {
            const clientData = getClientInfoFN(req);

            if (clientData.ipAddress === loginData.ipAddress && clientData.userAgent === loginData.userAgent) {
                const newToken = generateTokenFN({
                    username: user.username,
                    id: user._id
                });

                // Update The Login Document
                await loginModel.updateOne({ _id: loginData._id }, {
                    $set: {
                        token: newToken,
                        loginAt: Date.now()
                    }
                });

                res.status(200).json({
                    success: true,
                    message: `${user.username} login successfully !`,
                    user: {
                        _id: user._id,
                        username: user.username,
                        fullName: user.fullName,
                        profilePicture: user.profilePicture
                    },
                    token : newToken
                });

            } else {
                responseErrorFN(res, "User is already login on other device !", 409);
                return;
            }

        } else {
            req.user = user;
            next(); // Move To The Next Middleware
        }

    } catch (error: any) {
        console.log("Login validation middleware error :", error);
        responseErrorFN(res, "Internal server error !", 500);
    }
}

export default loginValidationMW