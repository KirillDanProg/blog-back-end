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
            const user = await UserModel.findById(userId)
            const newComment = new CommentModel({
                userId,
                postId,
                text: commentText,
                avatar: `http://localhost:4444${user?.avatar}`,
                userName: user?.userName
            })
            const comment = await newComment.save()
            post.commentIds.push(comment._id)
            const updatedPost = await PostModel.findOneAndUpdate({_id: postId}, post, {new: true})
            res.status(201).json(updatedPost?.commentIds)
        } else {
            errorsHandler(res, 404, "Статья не найдена")
        }

    } catch (e) {
        errorsHandler(res, 500, "Не удалось сохранить комментарий")
    }
}
