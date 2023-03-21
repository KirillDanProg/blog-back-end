import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// todo: fix any
export const createToken = (user: any) => {
    return jwt.sign(
        {
            _id: user._id
        },
        "secretKey123",
        {
            expiresIn: "30d"
        })
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const getUserData = (user: any) => {
    const {passwordHash, ...userData} = user._doc
    return userData
}