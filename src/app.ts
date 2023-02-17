import express from "express";
import dotenv from "dotenv";
import usersRoute from "./routes/users-routes";
import authRouter from "./routes/auth-router";
import urlsRouter from "./routes/urls-router";
dotenv.config();

const app = express();


app
 .use(express.json())
 .use("/users", usersRoute)
 .use("/auth", authRouter)
 .use("/urls", urlsRouter);

export default app;
