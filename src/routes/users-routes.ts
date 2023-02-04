import { Router } from "express";
import { usersPost } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas";

const usersRoute = Router();

usersRoute.post("/",validateBody(createUserSchema),usersPost)

export { usersRoute };
