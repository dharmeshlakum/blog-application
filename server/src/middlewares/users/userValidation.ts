import { Request, Response, NextFunction } from "express";
import userModel, {IUsers} from "../../models/user/userCollection";
import errorResponseHandlingFN from "../error/errorResponseHandling";

// Interface : Implement Blogs Data Inside Request
interface CustomRequest extends Request {
    user?: IUsers;
}

// Middleware : Validate Username
const usernameValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { username } = req.params;
        const user = await userModel.findOne({ username });

        if (!user) {
            errorResponseHandlingFN(res, `No data found for the user ${username}`, 404);
            return;

        } else {
            req.user = user;
            next() // move to the next middleware
        }

    } catch (error: any) {
        console.log("username validation middleware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export {
    usernameValidationMW
}