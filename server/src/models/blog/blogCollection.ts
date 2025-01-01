import mongoose, { Schema, model, Document } from "mongoose";

// Interface : Defines Blog Collection Schema Types
export interface IBlogs extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    coverPicture: string;
    content: string[];
    category: string;
    tags: [string];
    likes: mongoose.Schema.Types.ObjectId[];
    comments: mongoose.Schema.Types.ObjectId[];
    isPublished: boolean;
    isDeleted: Boolean;
    lastUpdate: Date;
    createdAt: Date;
}

const blogCollectionSchema = new Schema<IBlogs>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    coverPicture: {
        type: String
    },

    content: {
        type: [String],
        default: []
    },

    category: {
        type: String,
        enum: ["Technology", "Programming", "AI", "Web Development", "Data Science", "Design", "Business", "Health", "Lifestyle", "Education", "Marketing", "Travel", "Food", "Finance", "Sports", "Entertainment", "Politics", "Music", "Gaming", "General"],
        default: "General"
    },

    tags: {
        type: [String],
        default: []
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    }],

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],

    isPublished: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    lastUpdate: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const blogModel = model("Blogs", blogCollectionSchema);
export default blogModel;