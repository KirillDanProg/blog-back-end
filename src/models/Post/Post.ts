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
    commentIds: {
        type: Array,
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
