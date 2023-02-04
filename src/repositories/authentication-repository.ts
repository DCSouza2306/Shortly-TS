import prisma from "../data/database";

async function findByEmail(email: string) {
 return prisma.users.findFirst({
  where: { email }
 });
}

const authenticationRepository = {
 findByEmail
};

export default authenticationRepository;
