import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { userRepository } from "../users/users.repository";
import { AddFriendDTO } from "./friends.dto";
import { FriendQueryParams } from "./friends.interface";
import { getFriendsDTOMapper } from "./friends.mapper";
import { friendRepository } from "./friends.repository";

export const friendService = {
  addFriend: async(userId: string, data: AddFriendDTO) =>
    {
      const friend = await userRepository.getUserByCode(data.code);
      if (!friend) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.FRIEND_CODE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
      const me = await userRepository.getUserById(userId);
      if (!me) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 400, MESSAGE_CODE.NOT_FOUND);
      }
      if(friend.code === me.code) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.USER_CODE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
      const duplicate = await friendRepository.getFriendByUserFriend(me.id, friend.id);
      if (duplicate) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.FRIEND, 400, MESSAGE_CODE.BAD_REQUEST);
      }
      return await friendRepository.addFriends([
        {
          friendId: friend.id,
          userId: me.id
        },
        {
          friendId: me.id,
          userId: friend.id
        }
      ])
    },

  getFriends: async(userId: string, query: FriendQueryParams) => {
    const friends =  await friendRepository.getFriends(userId, query)
    return getFriendsDTOMapper(friends)
  },
};
