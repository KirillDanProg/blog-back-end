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
exports.deletePost = void 0;
const models_1 = require("../../models");
const errorsHandler_1 = require("../../utils/errorsHandler");
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        models_1.PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось удалить статью");
            }
            if (!doc) {
                (0, errorsHandler_1.errorsHandler)(res, 404, "Статья не найдена");
            }
            res.json({
                success: true
            });
        });
    }
    catch (e) {
        console.log(e);
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось удалить статью");
    }
});
exports.deletePost = deletePost;
