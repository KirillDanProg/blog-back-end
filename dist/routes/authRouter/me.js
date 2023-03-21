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
exports.me = void 0;
const models_1 = require("../../models");
const helpers_1 = require("../../utils/helpers");
const errorsHandler_1 = require("../../utils/errorsHandler");
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }
        const userData = (0, helpers_1.getUserData)(user);
        res.json(userData);
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Ошибка авторизации");
    }
});
exports.me = me;
