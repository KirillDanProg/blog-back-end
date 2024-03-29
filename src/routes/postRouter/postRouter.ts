import {createPost} from "./createPost";
import {deletePost} from "./deletePost";
import {getPost, getPosts} from "./getPosts";
import {updatePost} from "./updatePost";
import express from "express";
import {createPostValidation} from "../../validations";
import checkAuth from "../../utils/checkAuth";
import {commentPost} from "./commentPost";
import {getComments} from "./getComments";
import {paginatedResults} from "../../utils/paginatedResults";


export const postRouter = express.Router()

postRouter.get('/', paginatedResults, getPosts)
postRouter.post('/', checkAuth, createPostValidation, createPost)
postRouter.put('/:id', checkAuth, updatePost)
postRouter.delete('/:id', checkAuth, deletePost)
postRouter.get('/:id', checkAuth, getPost)
postRouter.post('/:id/comments', checkAuth, commentPost)
postRouter.get('/:id/comments', getComments)
