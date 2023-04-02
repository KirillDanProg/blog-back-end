import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import {authRouter, postRouter, profileRouter} from "./routes";
import checkAuth from "./utils/checkAuth";
import { UserModel } from './models';
import { getUserData } from "./utils/helpers";
import {Request, Response} from "express"
import { commentRouter } from './routes/commentRouter/commentRouter';

dotenv.config()
const PORT = process.env.PORT || 4444
export const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

/* ROUTES */
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

const storage = multer.diskStorage({
    "destination": (req, file, cb) => {
        cb(null, 'uploads')
    },
    "filename": (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

const uploadImage = async (req: Request, res: Response) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")
    const decoded = jwt.verify(token, "secretKey123") as jwt.JwtPayload
    const userId = decoded._id
    const user = await UserModel.findById(userId)
    const userProfileData = getUserData(user)
    const find = { _id: userId }
    const update = {
        ...userProfileData,
        avatar: `/uploads/${req.file?.originalname}`
    }
    await UserModel.findOneAndUpdate(find, update)
    res.json({
        url: `/uploads/${req.file?.originalname}`
    })

}
app.post("/upload", checkAuth, upload.single("image"), uploadImage)


app.get("/", (req, res) => {
    res.send("Hello world")
})
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

