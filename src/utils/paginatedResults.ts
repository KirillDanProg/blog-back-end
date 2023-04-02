import {NextFunction, Request, Response} from "express";
import {PostModel} from "../models";

export interface ResponseWithPaginationRes extends Response {
    paginatedResults?: any
}

export const paginatedResults = async (req: Request, res: ResponseWithPaginationRes, next: NextFunction) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    try {
        if (page || limit) {
            const skipIndex = (page - 1) * limit;
            let results = [];
            results = await PostModel.find()
                .limit(limit)
                .skip(skipIndex)
                .exec();
            res.paginatedResults = results;
            next();
        } else {
            next();
        }
    } catch (e) {
        res.status(500).json({message: "Error Occured"});
    }
}
