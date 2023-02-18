import prisma from "../../src/data/database";
import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { count } from "console";

export async function createUrl(params: Prisma.urlsUncheckedCreateInput) {
    const urlGiven = faker.internet.url() || params.url;
    const shortenGiven = faker.lorem.word(8) || params.shortUrl
 return await prisma.urls.create({
  data: {
    shortUrl: shortenGiven,
    url: urlGiven,
    id_user: params.id_user,
    count: params.count || 0
  }
 });
}
