import { Request } from "express";

// Interface : Defines Return Types
interface ReturnTypes {
    userAgent: string;
    ipAddress: string;
}

const getClientInfoFN = (req: Request): ReturnTypes => {

    const userAgent = req.headers["user-agent"] || "";
    let ipAddress = req.ip || "";

    if (req.headers["x-forwarded-for"]) {
        ipAddress = (req.headers["x-forwarded-for"] as string).split(",")[0]
    }

    return {
        userAgent,
        ipAddress
    }
}

export default getClientInfoFN;