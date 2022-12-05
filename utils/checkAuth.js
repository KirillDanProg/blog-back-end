import jwt from "jsonwebtoken"
import {errorsHandler} from "./errorsHandler.js";

export default (req, res, next) => {

    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    if (token) {
        try {
            const decoded = jwt.verify(token, "secretKey123")

            req.userId = decoded._id

            next();
        } catch (e) {
            errorsHandler(res, "Нет доступа")
        }

    } else {
        return res.status(403).json({
            message: "Нет доступа"
        })
    }
}