import {Response, Request} from "express";
import {PostModel} from "../../models";
import {errorsHandler} from "../../utils/errorsHandler";

export const createPost = async (req: Request, res: Response) => {
    try {
        const newPost = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            userId: req.userId
        })

        const post = await newPost.save()

        res.json(post)
    } catch (e) {
        errorsHandler(res, 500, "Не удалось создать статью")
    }
}
