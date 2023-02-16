import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { getUrl, openUrl, postUrl } from "../controllers/urls-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { urlSchema } from "../schemas/urls-schema";

const urlsRouter = Router();

urlsRouter.post("/shorten", authenticateToken, validateBody(urlSchema), postUrl)
urlsRouter.get("/:id",getUrl)
urlsRouter.get("/open/:shortUrl", openUrl)
urlsRouter.delete("/:id", authenticateToken)

export default urlsRouter