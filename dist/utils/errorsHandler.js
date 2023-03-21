"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const errorsHandler = (res, statusCode, err) => {
    return res.status(statusCode).json({
        message: err
    });
};
exports.errorsHandler = errorsHandler;
