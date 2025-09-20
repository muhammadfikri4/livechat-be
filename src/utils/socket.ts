import { Socket } from "socket.io";
import { io } from "..";
import { prisma } from "../config";
import { decodeToken } from "./decode-token";



  // Simpan user online
  const onlines = new Map<string, string>(); // userId -> socketId

  export const initialConnectSocket = (socket: Socket) => {
    console.log("User connected", socket.id);

   
// Login
socket.on("login", async (token: string) => {
    const { userId } = decodeToken(token)
    console.log({token, userId})
    onlines.set(userId, socket.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });
  
    if (!user) return;
  
    const friends = await prisma.friend.findMany({
      where: {
        userId
      },
    });
  
    friends.forEach((f) => {
      const friendId = f.userId === userId ? f.friendId : f.userId;
      const friendSocket = onlines.get(friendId);
      if (friendSocket) {
        io.to(friendSocket).emit("user-status", {
          id: user.id,
          name: user.name,
          isOnline: true,
        });
      }
    });
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isOnline: true,
      }
    })
  });
  
  // Disconnect
  socket.on("disconnect", async () => {
    let disconnectedUser: string | null = null;
  
    for (const [userId, sId] of onlines) {
      if (sId === socket.id) {
        disconnectedUser = userId;
        onlines.delete(userId);
      }
    }
  
    if (disconnectedUser) {
      const user = await prisma.user.findUnique({
        where: { id: disconnectedUser },
        select: { id: true, name: true },
      });
  
      if (!user) return;
  
      const friends = await prisma.friend.findMany({
        where: {
          OR: [
            { userId: disconnectedUser },
            { friendId: disconnectedUser },
          ],
        },
      });
  
      friends.forEach((f) => {
        const friendId =
          f.userId === disconnectedUser ? f.friendId : f.userId;
        const friendSocket = onlines.get(friendId);
        if (friendSocket) {
          io.to(friendSocket).emit("user-status", {
            id: user.id,
            name: user.name,
            isOnline: false,
          });
        }
      });
      console.log('update to db', {
        id: user.id,
        name: user.name
      })
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: false,
          lastSeen: new Date()
        }
      })
    }
  });
  }