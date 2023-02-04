import faker from "@faker-js/faker";
import { users } from "@prisma/client";
import prisma from "../../src/data/database";
import bcrypt from "bcrypt"

export async function createUser(params: Partial<users> = {}): Promise<users>{
    const name = params.name || faker.name.firstName()
    const incomingPassword = params.password || faker.internet.password(6);
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return await prisma.users.create({
        data: {
            name,
            email: params.email || faker.internet.email(),
            password: hashedPassword
        }
    })
}