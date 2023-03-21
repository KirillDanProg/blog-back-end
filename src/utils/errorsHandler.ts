import {Response} from "express";

export const errorsHandler = (res: Response, statusCode: number, err: string) => {
    return res.status(statusCode).json({
        message: err
    })
}