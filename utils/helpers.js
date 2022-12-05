import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id
        },
        "secretKey123",
        {
            expiresIn: "30d"
        })
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const getUserData = (user) => {
    const {passwordHash, ...userData} = user._doc
    return userData
}