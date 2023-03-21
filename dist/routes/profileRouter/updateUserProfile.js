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
exports.updateUserProfile = void 0;
const models_1 = require("../../models");
const errorsHandler_1 = require("../../utils/errorsHandler");
const helpers_1 = require("../../utils/helpers");
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (userId) {
            const user = yield models_1.UserModel.findById(userId);
            const userProfileData = (0, helpers_1.getUserData)(user);
            const find = { _id: userId };
            const update = Object.assign(Object.assign({}, userProfileData), { instagram: req.body.instagram, avatar: req.body.avatar, country: req.body.country, lastName: req.body.lastName, firstName: req.body.firstName, age: req.body.age });
            yield models_1.UserModel.findOneAndUpdate(find, update);
            res.status(200).json({
                success: true
            });
        }
        else {
            (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось обновить профиль");
        }
    }
    catch (e) {
        (0, errorsHandler_1.errorsHandler)(res, 500, "Не удалось обновить профиль");
    }
});
exports.updateUserProfile = updateUserProfile;
