import { Request, Response, NextFunction } from "express";
import blogModel, { IBlogs } from "../../models/blog/blogCollection";
import errorResponseHandlingFN from "../error/errorResponseHandling";

// Interface : Implement Blogs Data Inside Request
interface CustomRequest extends Request {
    blog?: IBlogs;
}

// Middleware : Validate Blogs ID
const blogIdValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { blogId } = req.params;
        const blog = await blogModel.findOne({ _id: blogId });

        if (!blog) {
            errorResponseHandlingFN(res, "No Data Found !", 404);
            return;

        } else {
            req.blog = blog;
            next() // move to the next middleware
        }

    } catch (error: any) {
        console.log("Blog id validation middleware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export {
    blogIdValidationMW
}