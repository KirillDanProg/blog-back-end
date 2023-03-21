import {UserModel} from "../../models/User/User.js";
import {errorsHandler} from "../../utils/errorsHandler.js";
import bcrypt from "bcrypt";
import {Response, Request} from "express";
import {createToken, getUserData} from "../../utils/helpers";

export const login = async (req: Request, res: Response) => {
        try {
            //todo: fix any
            const user: any = await UserModel.findOne({email: req.body.email})
            if (!user) {
                res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user?._doc.passwordHash)
            if (!isValidPassword) {
                res.status(400).json({
                    message: "Неверный логин или пароль"
                })
            }

            const token = createToken(user)
            const userData = getUserData(user)

            res.status(200).json({
                ...userData,
                token
            })
        } catch (e) {
            errorsHandler(res, 403, "Не удалось авторизоваться")
        }
}

