import express from "express"
import mongoose from "mongoose"
import {authRouter, postsRouter} from "./routes/index.js";
import checkAuth from "./utils/checkAuth.js";
import {loginValidation, authValidation, createPostValidation} from "./validations/validations.js";
import multer from "multer"
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 4444

export const app = express()
app.use(cors())


const storage = multer.diskStorage({
    "destination": (req, file, cb) => {
        cb(null, "uploads")
    },
    "filename": (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

app.post("/upload",checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.use(express.json())
app.use("/upload", express.static("uploads"))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/auth/me", checkAuth, authRouter.me)
app.post("/auth/register", authValidation, authRouter.register)
app.post("/auth/login", loginValidation, authRouter.login)

app.post("/posts", checkAuth, createPostValidation, postsRouter.createPost)
app.get("/posts", postsRouter.getPosts)
app.put("/posts/:id", checkAuth, postsRouter.updatePost)
app.delete("/posts/:id", checkAuth, postsRouter.deletePost)
app.get("/posts/:id", postsRouter.getPost)


async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

