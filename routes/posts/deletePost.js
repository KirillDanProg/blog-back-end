import {PostModel} from "../../models/Post.js";
import {errorsHandler} from "../../utils/errorsHandler.js";

export const deletePost = async (req, res) => {

    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) => {
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