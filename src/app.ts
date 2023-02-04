import express from "express";
import dotenv from "dotenv";
import { json } from "express";
dotenv.config();

const app = express();

app.use(json())

export default app
