import { Response } from "express";

// Function : Handle Error Response
const responseErrorFN = (res: Response, message: string, status: number) => {
    res.status(status).json({
        success: false,
        message
    });
}

export default responseErrorFN;