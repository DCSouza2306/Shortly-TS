import express from "express";
import dotenv from "dotenv";
import { json } from "express";
import { usersRoute } from "./routes/users-routes";
dotenv.config();

const app = express();

app.use(json()).use("/users", usersRoute);

export default app;
