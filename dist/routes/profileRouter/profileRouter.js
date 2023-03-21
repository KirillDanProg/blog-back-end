"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const getUserProfile_1 = require("./getUserProfile");
const updateUserProfile_1 = require("./updateUserProfile");
exports.profileRouter = express_1.default.Router();
exports.profileRouter.get('/:id', getUserProfile_1.getUserProfile);
exports.profileRouter.put('/:id', updateUserProfile_1.updateUserProfile);
