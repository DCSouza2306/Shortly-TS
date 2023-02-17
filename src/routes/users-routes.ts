import { Router } from "express";
import { getRanking, getUrls, usersPost } from "../controllers/users-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";

const usersRoute = Router();

usersRoute.post("/",validateBody(createUserSchema),usersPost)
usersRoute.get("/ranking",getRanking)
usersRoute.get("/me",authenticateToken, getUrls)


export default usersRoute;
