import prisma from "../../src/data/database";
import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export async function createUrl(params: Prisma.urlsUncheckedCreateInput) {
 return await prisma.urls.create({
  data: params,
 });
}
