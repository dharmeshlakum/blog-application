import mongoose, { Document, Schema, model } from "mongoose";

// Interface : Defines Comment Collection Schema Types
export interface IComment {
    user: mongoose.Schema.Types.ObjectId;
    blog: mongoose.Schema.Types.ObjectId;
    message: string;
    isSubComment: boolean
    parentComment: mongoose.Schema.Types.ObjectId | null;
    subComments: mongoose.Schema.Types.ObjectId[];
    isDeleted: boolean;
    timestamp: Date;
}

const commentCollectionSchema = new Schema<IComment>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isSubComment: {
        type: Boolean,
        default: false
    },

    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        default: null
    },

    subComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],

    isDeleted: {
        type: Boolean,
        default: false
    },

    timestamp: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const commentModel = model("Comments", commentCollectionSchema);
export default commentModel;