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
exports.getUserProfile = void 0;
const errorsHandler_1 = require("../../utils/errorsHandler");
const User_1 = require("../../models/User/User");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (userId) {
            const user = yield User_1.UserModel.findById(userId);
            const profileData = {
                country: user === null || user === void 0 ? void 0 : user.country,
                age: user === null || user === void 0 ? void 0 : user.age,
                avatar: user === null || user === void 0 ? void 0 : user.avatar,
                firstName: user === null || user === void 0 ? void 0 : user.firstName,
                instagram: user === null || user === void 0 ? void 0 : user.instagram,
                lastName: user === null || user === void 0 ? void 0 : user.lastName,
            };
            res.status(201).json(profileData);
        }
        else {
            (0, errorsHandler_1.errorsHandler)(res, 500, "Профиль не найден");
        }
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Профиль не найден");
    }
});
exports.getUserProfile = getUserProfile;
