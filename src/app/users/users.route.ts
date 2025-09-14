import { Router } from "express";
import { userController } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateProfileSchema } from "./users.request";

const router = Router();

router.get("/profile/me", userController.getProfile);
router.put("/profile/me", validateRequest(updateProfileSchema), userController.updateProfile);

export default router;
