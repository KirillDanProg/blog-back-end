"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const me_1 = require("./me");
const login_1 = require("./login");
const register_1 = require("./register");
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../utils/checkAuth"));
const validations_1 = require("../../validations");
exports.authRouter = express_1.default.Router();
exports.authRouter.get("/me", checkAuth_1.default, me_1.me);
exports.authRouter.post("/register", validations_1.authValidation, register_1.register);
exports.authRouter.post("/login", login_1.login);
