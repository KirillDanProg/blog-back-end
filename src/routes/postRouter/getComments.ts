import {Response, Request} from "express";
import {errorsHandler} from "../../utils/errorsHandler";
import {CommentModel, PostModel, UserModel} from "../../models";

export const getComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId)
        if(post) {
            res.status(200)
                .json(post.comments)
        } else {
            errorsHandler(res, 404, "Статья не найдена")
        }
    } catch (e) {
        errorsHandler(res, 500, "Не удалось загрузить комментарии")
    }
}
