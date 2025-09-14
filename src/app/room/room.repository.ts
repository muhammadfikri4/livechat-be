import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const roomRepository = {
  createRoom: async(userId: string, friendId: string) =>
    prisma.room.create({
      data: {
        users: {
          create: [
            { userId },
            { userId: friendId },
          ],
        },
      },
    }),

  getRooms: async(userId: string) =>
    prisma.room.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
      include: {
        users: {
          include: { user: true },
        },
      },
    }),
};
