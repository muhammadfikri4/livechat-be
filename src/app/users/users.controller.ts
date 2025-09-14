import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { userService } from "./users.service";

export const userController = {
  getProfile: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {
    const user = await userService.getProfile(req.userId ?? '');
    if (user instanceof Error) {
      return next(user);
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, "Profile retrieved successfully", user);
  },
  updateProfile: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {
    const user = await userService.updateProfile(req.userId ?? '', req.body.name);
    if (user instanceof Error) {
        return next(user);
      }
      HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, "Profile retrieved successfully", user);
  },
};
