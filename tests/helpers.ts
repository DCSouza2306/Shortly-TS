import prisma from "../src/data/database";
import { users } from "@prisma/client";
import { createUser } from "./factories/user-factory";
import jwt from "jsonwebtoken";
import { createSession } from "./factories/sessions-factory";

export async function cleanDb(){
    await prisma.sessions.deleteMany({})
    await prisma.urls.deleteMany({})
    await prisma.users.deleteMany({})
}

export async function generateValidToken(user?: users){
    const incomingUser = user || (await createUser())
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

    await createSession(incomingUser.id, token);

    return token
}