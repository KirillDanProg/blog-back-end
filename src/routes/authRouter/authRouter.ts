import {me} from "./me";
import {login} from "./login";
import {register} from "./register";
import express from "express";
import checkAuth from "../../utils/checkAuth";
import {authValidation} from "../../validations";

export const authRouter = express.Router()

authRouter.get("/me", checkAuth, me)
authRouter.post("/register", authValidation, register)
authRouter.post("/login", login)
