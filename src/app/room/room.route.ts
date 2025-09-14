import { Router } from "express";
import { roomController } from "./room.controller";

const router = Router();

router.post("/rooms/:friendId", roomController.createRoom);
router.get("/rooms", roomController.getRooms);

export default router;
