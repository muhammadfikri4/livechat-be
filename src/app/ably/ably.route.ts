import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { ablyAuthentication } from "./ably.controller";

export const route = Router()

route.get("/auth", CatchWrapper(ablyAuthentication))

export default route