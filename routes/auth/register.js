import {UserModel} from "../../models/User.js";
import {errorsHandler} from "../../utils/errorsHandler.js";
import {createToken, getUserData, hashPassword} from "../../utils/helpers.js";
import {validationResult} from "express-validator";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        // хэшируем пароль
        const hash = await hashPassword(req.body.password)

        const doc = new UserModel({
            email: req.body.email,
            userName: req.body.userName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        const user = await doc.save()

        const token = createToken(user)

        const userData = getUserData(user)
        return res.json({
            ...userData,
            token
        })
    } catch (e) {
        errorsHandler(res, 500, "Не удалось зарегистрироваться")
    }
}

