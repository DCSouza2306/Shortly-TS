import { Router } from "express";
import { signInPost } from "../controllers/authentication-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { signInSchema } from "../schemas/authentication-schema";

const authRouter = Router();

authRouter.post("/sign-in", validateBody(signInSchema), signInPost);

export default authRouter;
