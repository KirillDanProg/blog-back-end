"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = exports.postRouter = exports.authRouter = void 0;
var authRouter_1 = require("./authRouter/authRouter");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return authRouter_1.authRouter; } });
var postRouter_1 = require("./postRouter/postRouter");
Object.defineProperty(exports, "postRouter", { enumerable: true, get: function () { return postRouter_1.postRouter; } });
var profileRouter_1 = require("./profileRouter/profileRouter");
Object.defineProperty(exports, "profileRouter", { enumerable: true, get: function () { return profileRouter_1.profileRouter; } });
