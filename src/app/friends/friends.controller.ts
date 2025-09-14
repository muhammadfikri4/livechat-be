import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { friendService } from "./friends.service";

export const friendController = {
  addFriend: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {

    const result = await friendService.addFriend(req.userId ?? '', req.body);
    if (result instanceof Error) {
       next(result);
       return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, "Friend added successfully", result);
  },
  getFriends: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {
    const result = await friendService.getFriends(req.userId ?? '');
    if (result instanceof Error) {
        next(result);
        return
     }
     HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, "Friend added successfully", result);
  },
};
