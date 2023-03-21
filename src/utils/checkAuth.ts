import jwt from "jsonwebtoken"
import {errorsHandler} from "./errorsHandler.js";
import {NextFunction, Response, Request} from "express";

export default (req: Request, res: Response, next: NextFunction) => {

    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    if (token) {
        try {
            const decoded = jwt.verify(token, "secretKey123") as jwt.JwtPayload
            req.userId = decoded._id
            next();
        } catch (e) {
            errorsHandler(res, 403, "Нет доступа")
        }

    } else {
        return res.status(403).json({
            message: "Нет доступа"
        })
    }
}