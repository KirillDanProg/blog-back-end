export const errorsHandler = (res, statusCode, err) => {
    return res.status(statusCode).json({
        message: err
    })
}