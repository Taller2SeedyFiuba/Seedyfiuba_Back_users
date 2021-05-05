import { ApiError } from "./ApiError"
import { DatabaseError } from "sequelize"

export function notDefinedHandler(req, res, next){
    //Create error msg
    let error = new ApiError.notFound("Asked resource do not exists")
    next(error);
}


export function errorHandler(error, req, res, next){
    if (error instanceof ApiError){
        return res.status(error.code).json({
            "error" : error.message,
            "data" : {}
        })
    }
    if (error instanceof DatabaseError){
        return res.status(400).json({
            "error" : error.message,
            "data" : {}
        })
    }
    if (error instanceof Error){
        return res.status(error.status || 500).json({
            "error" : error.message,
            "data" : {}
        })
    }

    return res.status(500).json({
        "error": "Error on server",
        "data" : {}
    })
}
