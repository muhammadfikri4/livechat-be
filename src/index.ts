// import { dbconnect } from 'config'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import bodyParser from "body-parser";
import http from "http";
import { config } from "./libs";
import routes from "./routes";
import { HandlingError } from "./utils/HandlingError";

const app = express();

const port = config.PORT;
dotenv.config();
// dbconnect()
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
      "Content-Length",
      "Content-MD5",
      "Content-Type",
      "Date",
      "X-Api-Version",
      ''
    ],
    credentials: true,
    preflightContinue: false,
  })
);
// app.use((req, res, next) => {
//   if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
//     express.json()(req, res, next);
//   } else {
//     next();
//   }
// });
// app.use(compression())

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json())

app.use(routes);
// websocket.on("connection", (ws) => {
  //   ws.on("message", (message) => console.log(message));
  // });
  const server = http.createServer(app);
  // export const wss = new WebSocketServer({ server });
  // app.listen(port, () => {
    //   console.log(`Server running on port ${port}🚀`);
    // });
    // app.get('/messages', async (req, res) => {
    //   const messages = await prisma.message.findMany({
    //     orderBy: { createdAt: 'asc' },
    //   })
    //   res.json(messages)
    // })
    // setupWebSocket(server)

    app.use(HandlingError);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
