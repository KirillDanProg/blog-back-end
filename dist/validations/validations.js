"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.createPostValidation = exports.authValidation = void 0;
const express_validator_1 = require("express-validator");
exports.authValidation = [
    (0, express_validator_1.body)("email", "incorrect email").isEmail(),
    (0, express_validator_1.body)("password", "password should be more than 5 symbols").isLength({ min: 5 }),
    (0, express_validator_1.body)("userName", "incorrect user name").isLength({ min: 3 }),
    (0, express_validator_1.body)("avatarURL", "incorrect avatar image url").optional().isURL()
];
exports.createPostValidation = [
    (0, express_validator_1.body)("title", "title should be more than 3 symbols").isString().isLength({ min: 3 }),
    (0, express_validator_1.body)("text", "text should be more than 4 symbols").isLength({ min: 4 }),
    (0, express_validator_1.body)("tags", "incorrect tags").isString(),
    (0, express_validator_1.body)("imageUrl", "incorrect image url").optional().isString()
];
exports.loginValidation = [
    (0, express_validator_1.body)("email", "incorrect email").isEmail(),
    (0, express_validator_1.body)("password", "password should be more than 5 symbols").isLength({ min: 5 }),
];
