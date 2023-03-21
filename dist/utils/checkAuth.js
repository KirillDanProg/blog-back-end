"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorsHandler_js_1 = require("./errorsHandler.js");
exports.default = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "secretKey123");
            req.userId = decoded._id;
            next();
        }
        catch (e) {
            (0, errorsHandler_js_1.errorsHandler)(res, 403, "Нет доступа");
        }
    }
    else {
        return res.status(403).json({
            message: "Нет доступа"
        });
    }
};
