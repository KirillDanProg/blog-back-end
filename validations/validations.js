import { body } from "express-validator"

export const authValidation = [
    body("email", "incorrect email").isEmail(),
    body("password", "password should be more than 5 symbols").isLength({min: 5}),
    body("userName", "incorrect user name").isLength({min: 3}),
    body("avatarURL", "incorrect avatar image url").optional().isURL()
]

export const createPostValidation = [
    body("title", "title should be more than 3 symbols").isString().isLength({min: 3}),
    body("text", "text should be more than 4 symbols").isLength({min: 4}),
    body("tags", "incorrect tags").isString(),
    body("imageUrl", "incorrect image url").optional().isString()
]

export const loginValidation = [
    body("email", "incorrect email").isEmail(),
    body("password", "password should be more than 5 symbols").isLength({min: 5}),
]