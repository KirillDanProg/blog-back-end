import express from "express";
import {getUserProfile} from "./getUserProfile";
import { updateUserProfile } from './updateUserProfile';

export const profileRouter = express.Router()

profileRouter.get('/:id', getUserProfile)
profileRouter.put('/:id', updateUserProfile)
