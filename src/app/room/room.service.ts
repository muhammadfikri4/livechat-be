import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { friendRepository } from "../friends/friends.repository";
import { roomRepository } from "./room.repository";


const createRoom =  async(userId: string, friendId: string) =>
  {
      const friend = friendRepository.getFriend(friendId);
      if (!friend) {
        return new ErrorApp("Friend not found", 404, MESSAGE_CODE.NOT_FOUND);
      }
      return roomRepository.createRoom(userId, friendId)
  }

const getRooms = async(userId: string) => {
  return roomRepository.getRooms(userId)
}

export const roomService = {
  createRoom,
  getRooms
}