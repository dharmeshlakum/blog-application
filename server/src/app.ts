import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authRouter";

const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: "*"
}));

// Routes
app.use(authRouter);

// Listener
app.listen(port, () => {
    console.log("Server is running on port :", port);
});