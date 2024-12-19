import { Response } from "express";

// Function : Handle Errors 
const errorResponseHandlingFN = (res: Response, message: string, status: number) => {
    res.status(status).json({
        success: false,
        message,
    });
}

export default errorResponseHandlingFN;