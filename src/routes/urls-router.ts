import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { postUrl } from "../controllers/urls-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { urlSchema } from "../schemas/urls-schema";

const urlsRouter = Router();

urlsRouter.post("/shorten", authenticateToken, validateBody(urlSchema), postUrl)

export default urlsRouter