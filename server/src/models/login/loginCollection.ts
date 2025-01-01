import mongoose, { Document, Schema, model } from "mongoose";

// Interface : Defines Login Collection Schema Types
interface ILogins extends Document {
    user: mongoose.Schema.Types.ObjectId;
    token: string;
    ipAddress: string;
    userAgent: string;
    loginAt: Date
}

const loginCollectionSchema = new Schema<ILogins>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    ipAddress: {
        type: String,
        required: true
    },

    userAgent: {
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