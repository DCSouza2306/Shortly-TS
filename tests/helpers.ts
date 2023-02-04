import prisma from "../src/data/database";

export async function cleanDb(){
    await prisma.sessions.deleteMany({})
    await prisma.users.deleteMany({})
}