import mongoose from "mongoose"


export interface UserType {
    userName: string
    email: string
    country: string
    age: number
    firstName: string
    instagram: string
    avatar: string
    lastName: string
    passwordHash?: string
}

const UserSchema = new mongoose.Schema<UserType>({
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        country: String,
        age: Number,
        firstName: String,
        instagram: String,
        avatar: String,
        lastName: String
    },
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model("User", UserSchema)
