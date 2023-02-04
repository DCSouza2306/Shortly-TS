import { Router } from "express";
import { usersPost } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";

const usersRoute = Router();

usersRoute.post("/",validateBody(createUserSchema),usersPost)

export { usersRoute };
