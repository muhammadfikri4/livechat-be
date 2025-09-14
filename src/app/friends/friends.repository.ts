import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const friendRepository = {
  addFriend: async(userId: string, friendId: string) =>
    prisma.friend.create({ data: { userId, friendId } }),

  getFriends: async(userId: string) =>
    prisma.friend.findMany({
      where: { userId },
      include: { friend: true },
    }),
  getFriend: async(friendId: string) =>
    prisma.friend.findMany({
      where: { id: friendId },
      include: { friend: true },
    }),
};
