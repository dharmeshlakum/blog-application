import express from "express";
import cors from "cors";

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

// Listener
app.listen(port, () => {
    console.log("Server is running on port :", port);
});