import {Response, Request} from "express";
import {PostModel} from "../../models";
import {errorsHandler} from "../../utils/errorsHandler";
import {ResponseWithPaginationRes} from "../../utils/paginatedResults";

export const getPosts = async (req: Request, res: ResponseWithPaginationRes) => {
    try {
        const posts = await PostModel.find()
        if(req.query.page || req.query.limit) {
            res.json(res.paginatedResults)
        } else {
            res.json(posts)
        }
    } catch (e) {
        errorsHandler(res, 500, "Не удалось загрузить статьи")
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: {viewCount: 1}
            },
            {
                returnDocument: "after"
            },
            (err, doc) => {
                if (err) {
                    errorsHandler(res, 500, "Не удалось загрузить статью")
                }
                if (!doc) {
                    errorsHandler(res, 404, "Статья не найдена")
                }
                res.json(doc)
            }
        )
    } catch (e) {
        errorsHandler(res, 500, "Не удалось загрузить статью")
    }
}
