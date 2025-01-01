import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Allow To Use Envirenment Variables

// Getting Database Connection String Data From The Envirnment Varibales
const protocol = process.env.DB_PROTOCOL || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";
const url = process.env.DB_URL || "";
const databaseName = process.env.DB_DATABASE_NAME || "";

// Connection String
const connectionString = protocol + username + password + url + databaseName;
const dbConnectio = mongoose.connect(connectionString).then(() => {
    console.log("Database Connected successfully !");

}).catch((error: Error) => {
    console.log("Database Connection Error :", error.message);
});

