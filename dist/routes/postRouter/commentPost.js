"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentPost = void 0;
const errorsHandler_1 = require("../../utils/errorsHandler");
const models_1 = require("../../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield models_1.PostModel.findById(postId);
        const commentText = req.body.value;
        const token = req.headers.authorization;
        const data = token && jsonwebtoken_1.default.decode(token.slice(7));
        if (post && data) {
            const userId = data._id;
            const user = yield models_1.UserModel.findById(userId);
            const newComment = new models_1.CommentModel({
                userId,
                postId,
                text: commentText,
                avatar: `http://localhost:4444${user === null || user === void 0 ? void 0 : user.avatar}`,
                userName: user === null || user === void 0 ? void 0 : user.userName
            });
            const comment = yield newComment.save();
            post.commentIds.push(comment._id);
            const updatedPost = yield models_1.PostModel.findOneAndUpdate({ _id: postId }, post, { new: true });
            res.status(201).json(updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost.commentIds);
        }
        else {
            (0, errorsHandler_1.errorsHandler)(res, 404, "Статья не найдена");
        }
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось сохранить комментарий");
    }
});
exports.commentPost = commentPost;
