import mongoose from "mongoose"

export const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: []
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comments: {
            type: [
                {
                    userId: mongoose.Schema.Types.ObjectId,
                    text: String,
                    avatar: String,
                    userName: String
                }
            ],
            default: []
        },
        imageUrl: String,
        viewCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const PostModel = mongoose.model("Post", PostSchema)
