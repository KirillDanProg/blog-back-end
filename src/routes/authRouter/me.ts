import {Response, Request} from "express";
import {UserModel} from "../../models";
import {getUserData} from "../../utils/helpers";
import {errorsHandler} from "../../utils/errorsHandler";

export const me = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const userData = getUserData(user)

        res.json(userData)
    } catch (e) {
        errorsHandler(res, 500, "Ошибка авторизации")
    }
}