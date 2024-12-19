import mongoose, { Schema, Document, model } from "mongoose";

// Interface : Like Collection Schem Type
interface ILikes extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    blogId: mongoose.Schema.Types.ObjectId;
    timestamp: Date
}

const likeCollectionSchema = new Schema<ILikes>({

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

    timestamp: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

const likeModel = model("Likes", likeCollectionSchema);
export default likeModel;