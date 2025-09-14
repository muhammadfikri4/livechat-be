import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, registerSchema } from "./auth.request";

const router = Router();

router
.post("/register", validateRequest(registerSchema), authController.register)
.post("/login", validateRequest(loginSchema), authController.login);

export default router;
