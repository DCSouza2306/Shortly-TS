import prisma from "../src/data/database";
import { users } from "@prisma/client";
import { createUser } from "./factories/user-factory";
import jwt from "jsonwebtoken";
import { createSession } from "./factories/sessions-factory";
import faker from "@faker-js/faker";
import { createUrl } from "./factories/url-factory";

export async function cleanDb() {
 await prisma.sessions.deleteMany({});
 await prisma.urls.deleteMany({});
 await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
 const incomingUser = user || (await createUser());
 const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

 await createSession(incomingUser.id, token);


 return token;
}
export async function generateValidTokenWithInvalidUser(user?: users) {
 const incomingUser = user || (await createUser());
 const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

 const session = await createSession(incomingUser.id, token);
 await deleteUserAndSession(session.id, session.id_user);

 return token;
}

async function deleteUserAndSession(sessionId: number, userId: number) {
 await prisma.sessions.delete({
  where: {
   id: sessionId,
  },
 });

 await prisma.users.delete({
  where: {
   id: userId,
  },
 });
}

export async function generateManyUsersAndUrls() {
 for (let i = 0; i < 14; i++) {
  const bodyUser = generateValidUser();
  const user = await createUser(bodyUser);
  const bodyUrl = generateValidUrl(user.id);
  await createUrl(bodyUrl);
 }
}

export async function generateManyUrls(userId: number) {
 for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
  const bodyUrl = generateValidUrl(userId);
  await createUrl(bodyUrl);
 }
}

export const generateValidUser = () => ({
 name: faker.name.firstName(),
 email: faker.internet.email(),
 password: faker.internet.password(6),
});
export const generateValidUrl = (userId: number) => ({
 url: faker.internet.url(),
 shortUrl: faker.lorem.word(8),
 id_user: userId,
 count: faker.datatype.number({ min: 0, max: 40 }),
});
