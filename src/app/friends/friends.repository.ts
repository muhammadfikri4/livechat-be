import { PrismaClient } from "@prisma/client";
import { FriendQueryParams } from "./friends.interface";
import { FriendCreationDTO } from "./friends.dto";
const prisma = new PrismaClient();

export const friendRepository = {
  addFriend: async(userId: string, friendId: string) =>
    prisma.friend.create({ data: { userId, friendId } }),
  addFriends: async(data: FriendCreationDTO[]) =>
    prisma.friend.createMany({ 
      data: data.map(item => ({
        friendId: item.friendId,
        userId: item.userId
      }))
     }),

  getFriends: async(userId: string, query: FriendQueryParams) => {
    const { search } = query
    return prisma.friend.findMany({
      where: {  
        userId,
      ...search && {
        friend: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      },
       },
      include: { friend: true },
    })
  },
  getFriend: async(friendId: string) =>
    prisma.friend.findMany({
      where: { id: friendId },
      include: { friend: true },
    }),
    getFriendByUserFriend: async(userId: string, friendId: string) => prisma.friend.findFirst({
      where: {
        friendId,
        userId
      }
    })
};
