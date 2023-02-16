import prisma from "../data/database";

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

const urlsRepository = {
 create,
 findById,
 findByShorten,
 deleteUrl

};

export default urlsRepository;
