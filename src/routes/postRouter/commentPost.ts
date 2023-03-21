import {Response, Request} from "express";
import {errorsHandler} from "../../utils/errorsHandler";
import {CommentModel, PostModel, UserModel} from "../../models";
import {UserType} from "../../models/User/User";
import jwt from "jsonwebtoken";

export const commentPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId)
        const commentText = req.body.value
        const token = req.headers.authorization
        const data= token && jwt.decode(token.slice(7)) as jwt.JwtPayload

        if (post && data) {
            const userId = data._id
            const newComment = new CommentModel({
                userId,
                text: commentText
            })
            const comment = await newComment.save()
            post.comments.push(comment)
            const updatedPost = await PostModel.findOneAndUpdate({_id: postId}, post, {new: true})
            res.status(201).json(updatedPost)
        } else {
            errorsHandler(res, 404, "Статья не найдена")
        }

    } catch (e) {
        errorsHandler(res, 500, "Не удалось сохранить комментарий")
    }
}
