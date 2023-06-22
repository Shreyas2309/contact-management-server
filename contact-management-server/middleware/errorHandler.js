import {constants} from "../contants.js"

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VAlIDATION_ERROR:
            res.json({title: "Validation Field" , message: err.message, stackTrace: err.stack })
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized User" , message: err.message, stackTrace: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbidden" , message: err.message, stackTrace: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not FOund" , message: err.message, stackTrace: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({title: "Server Error" , message: err.message, stackTrace: err.stack })
            break;
        default:
            console.log("No error! All good")
            break;
    }
    
    
}