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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = require("./routes");
const checkAuth_1 = __importDefault(require("./utils/checkAuth"));
const models_1 = require("./models");
const helpers_1 = require("./utils/helpers");
const commentRouter_1 = require("./routes/commentRouter/commentRouter");
dotenv_1.default.config();
const PORT = process.env.PORT || 4444;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/uploads', express_1.default.static('uploads'));
/* ROUTES */
exports.app.use('/auth', routes_1.authRouter);
exports.app.use('/profile', routes_1.profileRouter);
exports.app.use('/posts', routes_1.postRouter);
exports.app.use('/comments', commentRouter_1.commentRouter);
const storage = multer_1.default.diskStorage({
    "destination": (req, file, cb) => {
        cb(null, 'uploads');
    },
    "filename": (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    const decoded = jsonwebtoken_1.default.verify(token, "secretKey123");
    const userId = decoded._id;
    const user = yield models_1.UserModel.findById(userId);
    const userProfileData = (0, helpers_1.getUserData)(user);
    const find = { _id: userId };
    const update = Object.assign(Object.assign({}, userProfileData), { avatar: `/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}` });
    yield models_1.UserModel.findOneAndUpdate(find, update);
    res.json({
        url: `/uploads/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname}`
    });
});
exports.app.post("/upload", checkAuth_1.default, upload.single("image"), uploadImage);
exports.app.get("/", (req, res) => {
    res.send("Hello world");
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_DB);
            exports.app.listen(PORT, () => {
                console.log(`server has been started on port ${PORT}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
