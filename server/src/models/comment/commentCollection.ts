import mongoose, { Schema, Document, model } from "mongoose";

// Interface : Comments Collection Schem Types
export interface IComments extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    blogId: mongoose.Schema.Types.ObjectId;
    message: string;
    isSubComment: boolean;
    parentCommentId: mongoose.Schema.Types.ObjectId | null;
    subComments: mongoose.Schema.Types.ObjectId[];
    isDeleted: boolean;
    timestamp: Date;
}

const commentCollectionSchem = new Schema<IComments>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    blogId: {
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

    parentCommentId: {
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

const commentModel = model("Comments", commentCollectionSchem);
export default commentModel;