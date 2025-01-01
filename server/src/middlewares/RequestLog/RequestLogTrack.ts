import { Request, Response, NextFunction } from "express";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import getClientInfoFN from "../../services/request/clientInformation";

const requestTrackingMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const path = join(__dirname, "../../log/RequestTrack.json");
        const clientData = getClientInfoFN(req);

        // Read The Previous Data And Parse It Into Json;
        const prevData = readFileSync(path, "utf-8");
        const parsedData = JSON.parse(prevData);

        // Create New Object With Current Client Information
        const user = {
            id: parsedData.length + 1,
            URL: req.path,
            originalURL: req.originalUrl,
            userAgent: clientData.userAgent,
            ipAddress: clientData.ipAddress,
            payload: req.body || "No Payload",
            query: req.query || "No Query",
        }
        parsedData.push(user);

        // Update New Data In File
        writeFileSync(path, JSON.stringify(parsedData));
        next();

    } catch (error: any) {
        console.log("Request tracking middleware error :", error);
        next();
    }
}

export default requestTrackingMW;