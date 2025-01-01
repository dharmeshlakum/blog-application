import express from "express";
import cors from "cors";
import requestTrackingMW from "./middlewares/RequestLog/RequestLogTrack";

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: "*"
}));
app.use(requestTrackingMW); // Make A Json File For All The Incoming Request

// Routes

// Listen
app.listen(port, () => {
    console.log("Server is running on port :", port)
})