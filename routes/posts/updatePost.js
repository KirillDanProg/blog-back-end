import {PostModel} from "../../models/Post.js";
import {errorsHandler} from "../../utils/errorsHandler.js";

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id

        const find = {_id: postId}
        const update = {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        }

       await PostModel.findOneAndUpdate(find, update)

        res.json({
            success: true
        })
    } catch (e) {
        errorsHandler(res, 500, "Не удалось обновить статью")
    }

}