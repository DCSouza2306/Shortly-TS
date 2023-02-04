import { Prisma } from "@prisma/client";
import prisma from "../data/database";

async function create(data: Prisma.sessionsUncheckedCreateInput) {
    return await prisma.sessions.create({
        data
    })
}

const sessionRepository = {
 create,
};

export default sessionRepository;
