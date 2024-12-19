import mongoose, { Schema, Document, model } from "mongoose";

// Interface : Login Collection Schema Types
interface ILogins extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    userAgent: string;
    ipAddress: string;
    loginAt: Date;
}

const loginCollectionSchema = new Schema<ILogins>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    userAgent: {
        type: String,
        required: true
    },

    ipAddress: {
        type: String,
        required: true
    },

    loginAt: {
        type: Date,
        default: Date.now(),
        index: {
            expireAfterSeconds: 60 * 60 * 24 * 7
        }
    }

}, { timestamps: true });

const loginModel = model("Logins", loginCollectionSchema);
export default loginModel;