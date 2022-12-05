import {PostModel} from "../../models/Post.js";
import {errorsHandler} from "../../utils/errorsHandler.js";

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (e) {
        errorsHandler(res, 500, "Не удалось создать статью")
    }
}