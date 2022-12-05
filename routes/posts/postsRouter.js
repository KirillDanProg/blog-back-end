import {createPost} from "./createPost.js";
import {getPost, getPosts} from "./getPosts.js";
import {deletePost} from "./deletePost.js";
import {updatePost} from "./updatePost.js";

export const postsRouter = {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost
}