import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "./ErrorCode";
import { HandleResponse } from "./HandleResponse";
import { ErrorApp } from "./HttpError";
import { MESSAGES } from "./Messages";
import { PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const HandlingError = (err: ErrorApp | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorApp) {
        return HandleResponse(res, err.statusCode, err.code, err.message)
    }
    if(err instanceof PrismaClientUnknownRequestError) {
        return HandleResponse(res, 500, err.message, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
    }
    if(err instanceof PrismaClientValidationError) {
        return HandleResponse(res, 500, err.message, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
    }
    console.log(err)
    return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
}