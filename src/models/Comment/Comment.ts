import mongoose from "mongoose"
import {UserModel} from "../User/User";
import {monitorEventLoopDelay} from "perf_hooks";

export interface CommentType {
    _id: string
    text: string
    userId: string
}

export const CommentSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postId: {
            type: String,
            ref: "Post",
            required: true
        },
        userName: String,
        avatar: String,
    },
    {
        timestamps: true
    }
)

export const CommentModel = mongoose.model("Comment", CommentSchema)
