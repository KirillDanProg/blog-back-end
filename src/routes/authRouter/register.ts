import {validationResult} from "express-validator";
import {Response, Request} from "express";
import {ProfileModel, UserModel} from "../../models";
import {createToken, getUserData, hashPassword} from "../../utils/helpers";
import {errorsHandler} from "../../utils/errorsHandler";

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        // хэшируем пароль
        const hash = await hashPassword(req.body.password)

        const newUser = new UserModel({
            email: req.body.email,
            userName: req.body.userName,
            avatar: '',
            passwordHash: hash,
            country: '',
            age: undefined,
            firstName: '',
            instagram: '',
            lastName: '' 
        })

        const user = await newUser.save()

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

