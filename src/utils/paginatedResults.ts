import {NextFunction, Request, Response} from "express";
import {PostModel} from "../models";

export interface ResponseWithPaginationRes extends Response {
    paginatedSortedResults?: any
}

export const paginatedResults = async (req: Request, res: ResponseWithPaginationRes, next: NextFunction) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const sortBy = req.query.sort || 'viewCount'
    const order = req.query.order || 'desc'
    const search = req.query.search || ''
    const mySort: any = {}

    if (sortBy) {
        mySort[sortBy as string] = order === 'desc' ? -1 : 1
    }

    const findByTitleOrText = [
        {text: {$regex: search, $options: 'i'}},
        {title: {$regex: search, $options: 'i'}}
    ]

    try {
        const skipIndex = (page - 1) * limit;

        let paginatedSortedResult = await PostModel
            .find().or(findByTitleOrText)
            .sort(mySort)
            .limit(limit)
            .skip(skipIndex)
            .exec();
        res.paginatedSortedResults = paginatedSortedResult
        next();
    } catch (e) {
        res.status(500).json({message: "Error Occurred"});
    }
}
