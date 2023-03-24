"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const createPost_1 = require("./createPost");
const deletePost_1 = require("./deletePost");
const getPosts_1 = require("./getPosts");
const updatePost_1 = require("./updatePost");
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../validations");
const checkAuth_1 = __importDefault(require("../../utils/checkAuth"));
const commentPost_1 = require("./commentPost");
const getComments_1 = require("./getComments");
exports.postRouter = express_1.default.Router();
exports.postRouter.get('/', getPosts_1.getPosts);
exports.postRouter.post('/', checkAuth_1.default, validations_1.createPostValidation, createPost_1.createPost);
exports.postRouter.put('/:id', checkAuth_1.default, updatePost_1.updatePost);
exports.postRouter.delete('/:id', checkAuth_1.default, deletePost_1.deletePost);
exports.postRouter.get('/:id', checkAuth_1.default, getPosts_1.getPost);
exports.postRouter.post('/:id/comments', checkAuth_1.default, commentPost_1.commentPost);
exports.postRouter.get('/:id/comments', getComments_1.getComments);
