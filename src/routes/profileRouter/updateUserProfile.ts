import { Response, Request } from "express";
import { ProfileModel, UserModel } from "../../models";
import { errorsHandler } from "../../utils/errorsHandler";
import { getUserData } from '../../utils/helpers';

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        if (userId) {
            const user = await UserModel.findById(userId);
            const userProfileData = getUserData(user)
            const find = { _id: userId }
            const update = {
                ...userProfileData,
                instagram: req.body.instagram,
                avatar: req.body.avatar,
                country: req.body.country,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                age: req.body.age
            }
            await UserModel.findOneAndUpdate(find, update)
            res.status(200).json({
                success: true
            })
        } else {
            errorsHandler(res, 500, "Не удалось обновить профиль")
        }

    } catch (e) {
        errorsHandler(res, 500, "Не удалось обновить профиль")
    }
}
