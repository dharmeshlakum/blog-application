import express, { Request, Response } from "express";
import userModel, { IUsers } from "../../models/user/userCollection";
import { generateTokenFN } from "../../services/token/tokenServices";
import loginModel from "../../models/login/loginCollection";
import signupValidationMW from "../../middlewares/auth/signupValidation";
import loginValidationMW from "../../middlewares/auth/loginValidation";
import { JwtPayload } from "jsonwebtoken";
import responseErrorFN from "../../middlewares/error/responseErrorHandling";
import getClientInfoFN from "../../services/request/clientInformation";
import authTokenVerificationMW from "../../middlewares/auth/authTokenVerification";

const authRouter = express.Router();

// Interface : Extract Addition Information For The Request
interface CustomRequest extends Request {
    user?: IUsers;
    token?: JwtPayload
}

// API : Signup
authRouter.post("/auth/signup", signupValidationMW, async (req: Request, res: Response) => {

    try {
        const { username, fullName, emailAddress, password } = req.body;
        const user = new userModel({
            username,
            password,
            fullName,
            emailAddress
        })
        const saveData = await user.save();

        // Generate Token For The User
        const token = generateTokenFN({
            username,
            id: saveData._id
        });
        const clientData = getClientInfoFN(req);

        // Create New Login Document
        const loginData = new loginModel({
            user: saveData._id,
            token,
            userAgent: clientData.userAgent,
            ipAddress: clientData.ipAddress
        });
        await loginData.save();

        res.status(200).json({
            success: true,
            message: `${saveData.username} login successfully !`,
            user: {
                _id: saveData._id,
                username: saveData.username,
                fullName: saveData.fullName,
                profilePicture: saveData.profilePicture
            },
            token
        });

    } catch (error: any) {
        console.log("Signup api error :", error);
        responseErrorFN(res, "Internal server error !", 500);
    }
});

// API : Login
authRouter.post("/auth/login", loginValidationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract User Data From The Request Object
        const { user } = req;
        if (!user) {
            responseErrorFN(res, "Unauthorized user... login again.", 401);
            return;
        }

        // Generate Token For The User
        const token = generateTokenFN({
            username: user.username,
            id: user._id
        });
        const clientData = getClientInfoFN(req);

        // Create New Login Document
        const loginData = new loginModel({
            user: user._id,
            token,
            userAgent: clientData.userAgent,
            ipAddress: clientData.ipAddress
        });
        await loginData.save();

        res.status(200).json({
            success: true,
            message: `${user.username} login successfully !`,
            user: {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePicture: user.profilePicture
            },
            token
        });

    } catch (error: any) {
        console.log("Login api error :", error);
        responseErrorFN(res, "Internal server error !", 500);
    }
});

// API : Logout 
authRouter.post("/auth/logout", authTokenVerificationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract Token From The Request Object
        const { token } = req;
        if (!token) {
            responseErrorFN(res, "Unauthorized user !", 401);
            return;
        }

        // Delete The Login Document
        await loginModel.deleteOne({ user: token.id });

        res.status(200).json({
            success: false,
            message: "User logout succesfully"
        });

    } catch (error: any) {
        console.log("Logout api error :", error);
        responseErrorFN(res, "Internal server error !", 500);
    }
})

export default authRouter;