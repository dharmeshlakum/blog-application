import mongoose, { Schema, Document, model } from "mongoose";
import genDefaultImgFN from "../../services/image/profileImageService";
import { passwordHashingFN } from "../../services/password/passwordServices";

// Interface : User Collection Schema Types
export interface IUsers extends Document {
    username: string;
    fullName: string;
    emailAddress: string;
    password: string;
    profilePicture: string;
    followers: mongoose.Schema.Types.ObjectId[];
    followings: mongoose.Schema.Types.ObjectId[];
    myWorks: mongoose.Schema.Types.ObjectId[];
    userType: string;
    isDeleted: boolean;
    registredAt: Date
}

const userCollectionSchema = new Schema<IUsers>({

    username: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    myWorks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }],

    userType: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    registredAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

// Pre Middleware
userCollectionSchema.pre("save", async function (next) {

    try {
        // hash password before saving document
        if (this.password) {
            const hashcode = await passwordHashingFN(this.password);
            this.password = hashcode;
        }
        // generate default image for user
        this.profilePicture = genDefaultImgFN(this.fullName);
        next();

    } catch (error: any) {
        console.log("User collection pre middleware error :", error);
        next(error)
    }
});

const userModel = model("Users", userCollectionSchema);
export default userModel;