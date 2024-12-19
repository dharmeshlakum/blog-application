import mongoose, { Schema, Document, model } from "mongoose";

// Interface : Blogs Collection Schema Types
export interface IBlogs extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    content: [string];
    coverPicture: string;
    comments: mongoose.Schema.Types.ObjectId[];
    likes: mongoose.Schema.Types.ObjectId[];
    isDeleted: boolean;
    createdAt: Date;
}

const blogCollectionSchema = new Schema<IBlogs>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: [String],
        default: []
    },

    coverPicture: {
        type: String,
        default: "default-cover-picture.jpg"
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const blogModel = model("Blogs", blogCollectionSchema);
export default blogModel;