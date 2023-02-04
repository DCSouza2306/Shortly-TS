import express from "express";
import dotenv from "dotenv";
import { json } from "express";
import { usersRoute } from "./routes/users-routes";
import { authRouter } from "./routes/auth-router";
dotenv.config();

const app = express();

app.use(json()).use("/users", usersRoute).use("/auth",authRouter);

export default app;
