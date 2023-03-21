"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.PostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PostSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: {
        type: [
            {
                userId: mongoose_1.default.Schema.Types.ObjectId,
                text: String,
            }
        ],
        default: []
    },
    imageUrl: String,
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
exports.PostModel = mongoose_1.default.model("Post", exports.PostSchema);