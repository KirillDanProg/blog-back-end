import {UserModel} from "../../models/User.js";
import {errorsHandler} from "../../utils/errorsHandler.js";
import bcrypt from "bcrypt";
import {createToken, getUserData} from "../../utils/helpers.js";

export const login = async (req, res) => {
        try {
            const user = await UserModel.findOne({email: req.body.email})
            if (!user) {
                res.status(404).json({
                    message: "Не удалось авторизоваться"
                })
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
            if (!isValidPassword) {
                res.status(400).json({
                    message: "Неверный логин или пароль"
                })
            }

            const token = createToken(user)
            const userData = getUserData(user)

            res.json({
                ...userData,
                token
            })
        } catch (e) {
            errorsHandler(res, "Не удалось авторизоваться")
        }
}

