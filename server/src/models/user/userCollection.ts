import mongoose, { Document, Schema, model } from "mongoose";
import { passwordHashingFN } from "../../services/password/passwordServices";
import createDefaultImgFN from "../../services/images/defaultImage";

// interface : Defines User Collection Schema Types
export interface IUsers extends Document {
    username: string;
    password: string;
    fullName: string;
    emailAddress: string;
    profilePicture: string;
    about: string;
    myWork: mongoose.Schema.Types.ObjectId[];
    savedBlogs: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
    followings: mongoose.Schema.Types.ObjectId[];
    userType: string;
    isDeleted: boolean;
    createdAt: Date;
}

const userCollectionSchema = new Schema<IUsers>({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: "default-user-icon.png"
    },

    about: {
        type: String,
        default: ""
    },

    myWork: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }],

    savedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    userType: {
        type: String,
        enum: ["user", "premium-user", "admin"],
        default: "user"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

}, {timestamps: true});

// Pre Middleware
userCollectionSchema.pre("save", async function (next) {

    try {
        // Encrypt Password Before Saving 
        if (this.password) {
            const hashcode = await passwordHashingFN(this.password);
            this.password = hashcode;
        }
        // Generate Default Profile Picture
        this.profilePicture = createDefaultImgFN(this.username);

        next();  // Move To The Next Middleware

    } catch (error: any) {
        console.log("User collection pre middleware error :", error);
        next(); // Move To The Next Middleware
    }
});

const userModel = model("Users", userCollectionSchema);
export default userModel;