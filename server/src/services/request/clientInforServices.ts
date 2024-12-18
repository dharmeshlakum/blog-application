import { Request } from "express";

// Interface : Return Types
interface ReturnTypes {
    userAgent: string;
    ipAddress: string;
}

// Function : Get Client Data From Request
const getClientInfoFN = (req: Request): ReturnTypes => {

    const userAgent = req.headers["user-agent"] || "";
    let ipAddress = req.ip || "";

    if (req.headers['x-forwarded-for']) {
        ipAddress = (req.headers["x-forwarded-for"] as string).split(",")[0].trim();
    }

    return {
        userAgent,
        ipAddress
    }
}

export default getClientInfoFN;