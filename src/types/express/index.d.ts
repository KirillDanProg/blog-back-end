declare namespace Express {
    export interface Request {
        userId?: string
    }
}

declare namespace NodeJS {
    export interface ProcessEnv {
        MONGO_DB: string
    }
}
