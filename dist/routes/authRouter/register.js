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
exports.register = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../../models");
const helpers_1 = require("../../utils/helpers");
const errorsHandler_1 = require("../../utils/errorsHandler");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        // хэшируем пароль
        const hash = yield (0, helpers_1.hashPassword)(req.body.password);
        const newUser = new models_1.UserModel({
            email: req.body.email,
            userName: req.body.userName,
            avatar: '',
            passwordHash: hash,
            country: '',
            age: undefined,
            firstName: '',
            instagram: '',
            lastName: ''
        });
        const user = yield newUser.save();
        const token = (0, helpers_1.createToken)(user);
        const userData = (0, helpers_1.getUserData)(user);
        return res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось зарегистрироваться");
    }
});
exports.register = register;
