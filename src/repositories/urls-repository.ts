import { count } from "console";
import prisma from "../data/database";
import userRepository from "./users-repository";

async function create(url: string, shortUrl: string, userId: number) {
 return await prisma.urls.create({
  data: { shortUrl, url, id_user: userId },
 });
}

async function findById(urlId: number){
    return await prisma.urls.findFirst({
        where: {id: urlId}
    })
}

async function findByShorten(shortUrl: string){
    return await prisma.urls.findFirst({
        where: {
            shortUrl
        },
        select: {
            url: true
        }
    })
}

async function deleteUrl(urlId: number){
    return await prisma.urls.delete({
        where: {id: urlId}
    })
}

async function findAll(userId: number) {
    return await prisma.urls.findMany({
        where:{
            id_user: userId
        },
        select: {
            id: true,
            shortUrl: true,
            url: true,
            count: true
        }
    })
}

async function visitCount(userId: number){
    return await prisma.urls.aggregate({
        where: {
            id_user: userId
        },
        _sum: {
            count: true,
        }
    })
}

const urlsRepository = {
 create,
 findById,
 findByShorten,
 deleteUrl,
 findAll,
 visitCount
};

export default urlsRepository;
