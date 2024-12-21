import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { join } from "path";
import errorResponseHandlingFN from "../error/errorResponseHandling";

// [01] User Profile Picture
const userImgPath = join(__dirname, "../assets/users");
const userStorage = multer.diskStorage({

    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, userImgPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, file.originalname.replaceAll(" ", "-") + Date.now() + ".jpg");
    }
});

// Allow Only JPEG | JPG |PNG File
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {

    const validFile = /.jpg$|.png$|.jpeg$/;
    const validation = validFile.test(file.originalname);
    if (validation) {
        cb(null, true);

    } else {
        cb(new Error("Invalid file type !"), false);
    }
}

const userMulterInstance = multer({
    storage: userStorage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

// Middleware : Handle User Image Uploading
const userImgUploadingMW = (req: Request, res: Response, next: NextFunction) => {

    try {
        const upload = userMulterInstance.single("profilePic");
        upload(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                errorResponseHandlingFN(res, error.message, 414);
                return;

            } else if (error) {
                errorResponseHandlingFN(res, "File Size is too large !", 413);
                return;

            } else {
                next(); // move to the next middleware
            }
        });

    } catch (error: any) {
        console.log("User image uploading middeware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

// [02] : Blog Cover Picture
const coverPicPath = join(__dirname, "../assets/blogs");
const blogStorage = multer.diskStorage({

    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, coverPicPath);

    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, file.originalname.replaceAll(" ", "-") + Date.now() + ".jpg");
    }
});

const blogMulterInstance = multer({
    storage: blogStorage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

// Middleware : Handle Blog Cover Picture Uploading
const blogCoverPicUploadingMW = (req: Request, res: Response, next: NextFunction) => {

    try {
        const upload = blogMulterInstance.single("coverPic");
        upload(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                errorResponseHandlingFN(res, error.message, 414);
                return;

            } else if (error) {
                errorResponseHandlingFN(res, "File Size is too large !", 413);
                return;

            } else {
                next(); // move to the next middleware
            }
        });

    } catch (error: any) {
        console.log("blog cover picture uploading middeware error :", error);
        errorResponseHandlingFN(res, "Internal server error !", 500);
    }
}

export {
    userImgUploadingMW,
    blogCoverPicUploadingMW
}