import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Allow To Access Envirenment Veriable 

// Database Connection Variables
const protocol = process.env.DB_PROTOCOL || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const url = process.env.DB_URL || "";
const name = process.env.DB_NAME || "";

const connectionString = protocol + "://" + username + ":" + password + "@" + url + "/" + name;

const databaseConnection = mongoose.connect(connectionString).then(() => {
    console.log("Database Connected successfully !");
    
}).catch((error: Error) => {
    console.log("Database connection error :", error.message);
})