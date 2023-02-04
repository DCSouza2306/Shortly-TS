import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { postUrl } from "../controllers/urls-controller";

const urlsRouter = Router();

urlsRouter.post("/shorten", authenticateToken, postUrl)

export default urlsRouter