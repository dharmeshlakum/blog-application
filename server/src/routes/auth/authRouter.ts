import express, { Request, Response } from "express";
import userModel, { IUsers } from "../../models/user/userCollection";
import loginModel from "../../models/login/loginCollection";
import signupValidationMW from "../../middlewares/auth/signupValidation";
import loginValidationMW from "../../middlewares/auth/loginValidation";
import { generateTokenFN } from "../../services/token/tokenServices";
import errorResponseHandlingFN from "../../middlewares/error/errorResponseHandling";
import getClientInfoFN from "../../services/request/clientInforServices";
import { JwtPayload } from "jsonwebtoken";
import authTokenVerificationMW from "../../middlewares/auth/authTokenVerification";

const authRouter = express.Router();

// Interface : Extract Additional Data From Request
interface CustomRequest extends Request {
    user?: IUsers;
    token?: JwtPayload;
}

// Signup API
authRouter.post("/auth/signup", signupValidationMW, async (req: Request, res: Response) => {

    try {
        const { username, emailAddress, password, fullName } = req.body;

        // Create New User Document And Save To Database
        const user = new userModel({
            username,
            emailAddress,
            password,
            fullName
        });
        const saveUser = await user.save();
        const token = generateTokenFN({ id: user._id, loginAt: Date.now(), username: user.username });
        const clientInfo = getClientInfoFN(req);

        // Create New Login Document And Save To Database
        const loginData = new loginModel({
            userId: saveUser._id,
            token,
            userAgent: clientInfo.userAgent,
            ipAddress: clientInfo.ipAddress
        });
        await loginData.save();

        res.status(201).json({
            success: false,
            token,
            message: `${username} login successfully !`,
            user: {
                id: saveUser._id,
                username: saveUser.username,
                fullName: saveUser.fullName,
                profilePicture: saveUser.profilePicture
            }
        });

    } catch (error: any) {
        console.log("Signup api error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
});

// Login API
authRouter.post("/auth/login", loginValidationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract Userdata From the Request
        const { user } = req;
        if (!user) {
            errorResponseHandlingFN(res, "Internal Server Error !", 500);
            return;
        }

        const token = generateTokenFN({ id: user._id, loginAt: Date.now(), username: user.username });
        const clientInfo = getClientInfoFN(req);

        // Create New Login Document And Save To Database
        const loginData = new loginModel({
            userId: user._id,
            token,
            userAgent: clientInfo.userAgent,
            ipAddress: clientInfo.ipAddress
        });
        await loginData.save();

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

    } catch (error: any) {
        console.log("Login api error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
});

// Logout API
authRouter.post("/auth/logout", authTokenVerificationMW, async (req: CustomRequest, res: Response) => {

    try {
        // Extract Token From The Request
        const { token } = req;
        if (!token) {
            errorResponseHandlingFN(res, "Token is not awailable !", 401);
            return;
        }

        await loginModel.deleteOne({ userId: token.id }); // delete the document
        res.status(200).json({
            success: true,
            message: "User logout successfully !"
        });

    } catch (error: any) {
        console.log("Logout api error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
});

export default authRouter;