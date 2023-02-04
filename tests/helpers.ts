import prisma from "../src/data/database";

export async function cleanDb(){
    await prisma.users.deleteMany({})
}