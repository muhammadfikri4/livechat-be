import { NextFunction, Request, Response } from "express";
import { authService } from "../auth/auth.service";
import { ErrorApp } from "../../utils/HttpError";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const result = await authService.register(body);
    if(result instanceof ErrorApp) {
        next(result)
        return
      }
      HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, "Register successfully", result);
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      console.log({body})
      const result = await authService.login(body);
      if(result instanceof ErrorApp) {
        next(result)
        return
      }
      HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, "Login successfully", result);
  },
};
