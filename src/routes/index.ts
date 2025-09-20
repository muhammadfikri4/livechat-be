import { Router, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { MESSAGES } from "../utils/Messages";
// import { WebSocket } from "ws";
// import { wss } from "..";
import authRoutes from "../app/auth/auth.route";
import userRoutes from "../app/users/users.route";
import friendRoutes from "../app/friends/friends.route";
import roomRoutes from "../app/room/room.route";
import ablyRoute from "../app/ably/ably.route";
import { VerifyToken } from "../middleware/verifyToken";

const route = Router();

// Gabungkan semua route di sini
route.use('/auth',authRoutes);
route.use('/users', VerifyToken(), userRoutes);
route.use('/friends', VerifyToken(), friendRoutes);
route.use('/rooms', roomRoutes);
route.use('/ably', ablyRoute);



// route.use("/websocket", (req: Request, res: Response) => {
//   // Handle WebSocket connections
//   wss.on("connection", (ws: WebSocket) => {
//     console.log("New client connected");
//     ws.send([
//       {
//         name: "fikri",
//         age: 20,
//       },
//       {
//         name: "fikri",
//         age: 20,
//       },
//       {
//         name: "fikri",
//         age: 20,
//       },
//       {
//         name: "fikri",
//         age: 20,
//       },
//     ]);
//     ws.on("message", (message) => {
//       console.log("Received:", message.toString());

//       // Broadcast the message to all connected clients
//       wss.clients.forEach((client) => {
//         if (client.readyState === ws.OPEN) {
//           client.send(`Server received: ${message}`);
//         }
//       });
//     });
//     ws.on("close", () => console.log("Client disconnected"));
//   });
// });

route.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 🚀" });
});

route.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    code: MESSAGE_CODE.NOT_FOUND,
    message: MESSAGES.ERROR.NOT_FOUND.ROUTE,
  });
});

export default route;
