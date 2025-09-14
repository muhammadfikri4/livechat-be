import { Router } from "express";
import { friendController } from "./friends.controller";

const router = Router();

router.post("/add", friendController.addFriend);
router.get("/", friendController.getFriends);

export default router;
