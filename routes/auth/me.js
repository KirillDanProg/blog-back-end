import {UserModel} from "../../models/User.js";
import {getUserData} from "../../utils/helpers.js";
import {errorsHandler} from "../../utils/errorsHandler.js";

export const me = async (req, res) => {
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