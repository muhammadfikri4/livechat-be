import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { roomService } from "./room.service";


export const roomController = {
  createRoom: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {
    const result = await roomService.createRoom(req.userId ?? '', req.params.friendId);
    if (result instanceof Error) {
        next(result);
        return
      }
      HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, "Room created successfully", result);
  },
  getRooms: async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {
    const result = await roomService.getRooms(req.userId ?? '');
    if (result instanceof Error) {
      next(result);
      return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, "Rooms retrieved successfully", result);
  },
};
