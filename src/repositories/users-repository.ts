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

async function findById(userId: number){
    return await prisma.users.findFirst({
        where: {
            id: userId
        }
    })
}

const userRepository = {
 findByEmail,
 create,
 findById
};

export default userRepository;
