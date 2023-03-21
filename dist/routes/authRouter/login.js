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
exports.login = void 0;
const User_js_1 = require("../../models/User/User.js");
const errorsHandler_js_1 = require("../../utils/errorsHandler.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../../utils/helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo: fix any
        const user = yield User_js_1.UserModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                message: "Пользователь не найден"
            });
        }
        const isValidPassword = yield bcrypt_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user._doc.passwordHash);
        if (!isValidPassword) {
            res.status(400).json({
                message: "Неверный логин или пароль"
            });
        }
        const token = (0, helpers_1.createToken)(user);
        const userData = (0, helpers_1.getUserData)(user);
        res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (e) {
        (0, errorsHandler_js_1.errorsHandler)(res, 403, "Не удалось авторизоваться");
    }
});
exports.login = login;
