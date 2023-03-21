import {Response, Request} from "express";
import {PostModel} from "../../models";
import {errorsHandler} from "../../utils/errorsHandler";

export const deletePost = async (req: Request, res: Response) => {

    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete({
            _id: postId
        }, (err: string, doc: Document) => {
            if (err) {
                errorsHandler(res, 500, "Не удалось удалить статью")
            }
            if (!doc) {
                errorsHandler(res, 404, "Статья не найдена")
            }

            res.json({
                success: true
            })
        })
    } catch (e) {
        console.log(e)
        errorsHandler(res, 500, "Не удалось удалить статью")
    }

}