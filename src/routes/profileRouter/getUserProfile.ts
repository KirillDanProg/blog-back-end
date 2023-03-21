import { Response, Request } from "express";
import { ProfileModel } from "../../models";
import { errorsHandler } from "../../utils/errorsHandler";
import { UserModel } from '../../models/User/User';
import { IProfile } from '../../models/Profile/types/index';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        if (userId) {
            const user = await UserModel.findById(userId)
            const profileData = {
                country: user?.country,
                age: user?.age,
                avatar: user?.avatar,
                firstName: user?.firstName,
                instagram: user?.instagram,
                lastName: user?.lastName,
            }

            res.status(201).json(profileData)
        } else {
            errorsHandler(res, 500, "Профиль не найден")
        }

    } catch (e) {
        errorsHandler(res, 500, "Профиль не найден")
    }
}

