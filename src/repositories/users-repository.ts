import { CreateUserParams } from "../service/user-service";
import prisma from "../data/database";

async function findByEmail(email: string) {
 const users = await prisma.users.findFirst({
  where: {
   email
  },
 });
 return users;
}

async function create(user: CreateUserParams) {
 return prisma.users.create({
  data: user,
 });
}

async function findById(userId: number) {
 return await prisma.users.findFirst({
  where: {
   id: userId,
  },
 });
}

async function findAll() {
 return await prisma.users.findMany({
    select:{
        id: true,
        name: true,
        _count:{
            select: {
                urls: true,
            }
        },
        urls:{
            select:{
                count: true,
            }
        }
    },
    take: 10
 });
}



const userRepository = {
 findByEmail,
 create,
 findById,
 findAll,
};

export default userRepository;
