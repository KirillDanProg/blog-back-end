"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.CommentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CommentSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: String,
    avatar: String,
}, {
    timestamps: true
});
exports.CommentModel = mongoose_1.default.model("Comment", exports.CommentSchema);
