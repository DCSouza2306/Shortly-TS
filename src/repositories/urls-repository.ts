import prisma from "../data/database";

async function create(url: string, shortUrl: string, userId: number) {
 return await prisma.urls.create({
  data: { shortUrl, url, id_user: userId },
 });
}

const urlsRepository = {
 create,
};

export default urlsRepository;
