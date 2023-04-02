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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.getPosts = void 0;
const models_1 = require("../../models");
const errorsHandler_1 = require("../../utils/errorsHandler");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield models_1.PostModel.find();
        if (req.query.page || req.query.limit) {
            res.json(res.paginatedResults);
        }
        else {
            res.json(posts);
        }
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось загрузить статьи");
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        models_1.PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewCount: 1 }
        }, {
            returnDocument: "after"
        }, (err, doc) => {
            if (err) {
                (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось загрузить статью");
            }
            if (!doc) {
                (0, errorsHandler_1.errorsHandler)(res, 404, "Статья не найдена");
            }
            res.json(doc);
        });
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось загрузить статью");
    }
});
exports.getPost = getPost;
