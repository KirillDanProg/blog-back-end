"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = exports.ProfileSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProfileSchema = new mongoose_1.default.Schema({
    country: String,
    age: Number,
    firstName: String,
    instagram: String,
    avatar: String,
    lastName: String
});
exports.ProfileModel = mongoose_1.default.model("Profile", exports.ProfileSchema);
