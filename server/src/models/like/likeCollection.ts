import mongoose, { Document, Schema, model } from "mongoose";

// Interface : Defines Like Collection Schema Types
interface ILikes extends Document {
    user: mongoose.Schema.Types.ObjectId;
    blog: mongoose.Schema.Types.ObjectId;
    likedAt: Date;
}

const likeCollectionSchema = new Schema<ILikes>({

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

    likedAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const likeModel = model("Likes", likeCollectionSchema);
export default likeModel;