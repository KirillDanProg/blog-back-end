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
exports.updatePost = void 0;
const models_1 = require("../../models");
const errorsHandler_1 = require("../../utils/errorsHandler");
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const find = { _id: postId };
        const update = {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            userId: req.userId
        };
        yield models_1.PostModel.findOneAndUpdate(find, update);
        res.json({
            success: true
        });
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось обновить статью");
    }
});
exports.updatePost = updatePost;
