import {Response, Request} from "express";
import {PostModel} from "../../models";
import {errorsHandler} from "../../utils/errorsHandler";

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        const find = {_id: postId}
        const update = {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            userId: req.userId
        }

       await PostModel.findOneAndUpdate(find, update)

        res.json({
            success: true
        })
    } catch (e) {
        errorsHandler(res, 500, "Не удалось обновить статью")
    }

}