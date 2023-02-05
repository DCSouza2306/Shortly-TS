import prisma from "../../src/data/database";
import faker from "@faker-js/faker";

export async function createSession(userId: number, token: string) {
 return await prisma.sessions.create({
  data: {
    id_user: userId,
    token
  }
 });
}
