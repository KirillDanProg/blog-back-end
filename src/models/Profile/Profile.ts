import mongoose from "mongoose"

export const ProfileSchema = new mongoose.Schema({
        country: String,
        age: Number,
        firstName: String,
        instagram: String,
        avatar: String,
        lastName: String
    }
)

export const ProfileModel = mongoose.model("Profile", ProfileSchema)
