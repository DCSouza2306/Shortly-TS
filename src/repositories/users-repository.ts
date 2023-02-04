import { CreateUserParams } from "../service/user-service";
import prisma from "../data/database";

async function findByEmail(email: string) {
 return prisma.users.findFirst({
  where: {
   email
  },
 });
}

async function create(user: CreateUserParams) {
 return prisma.users.create({
  data: user,
 });
}

const userRepository = {
 findByEmail,
 create,
};

export default userRepository;
