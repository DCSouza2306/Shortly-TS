import { cleanDb } from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import faker from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import jwt from "jsonwebtoken";
import { generateValidToken } from "../helpers";
import { createUrl } from "../factories/url-factory";
import httpStatus from "http-status";
import prisma from "../../src/data/database";

beforeEach(async () => {
 await cleanDb();
});

const server = supertest(app);

describe("POST /urls/shorten", () => {
 it("Should response with status 401 if token is not given", async () => {
  const response = await server.post("/urls/shorten");

  expect(response.status).toBe(401);
 });

 it("Should response with status 401 if given token is not valid", async () => {
  const token = faker.lorem.word();
  const response = await server
   .post("/urls/shorten")
   .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(401);
 });

 it("Should response with status 401 if given token has no session", async () => {
  const userWithoutSession = await createUser();
  const token = jwt.sign(
   { userId: userWithoutSession.id },
   process.env.JWT_SECRET
  );
  const response = await server
   .post("/urls/shorten")
   .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(401);
 });

 describe("when token is valid", () => {
  it("Should response with status 422 if body has not sent", async () => {
   const token = await generateValidToken();
   const response = await server
    .post("/urls/shorten")
    .set("Authorization", `Bearer ${token}`);

   expect(response.status).toBe(422);
  });

  it("Should response with status 422 if body sent has invalid format", async () => {
   const token = await generateValidToken();
   const body = { [faker.lorem.word()]: faker.lorem.word() };
   const response = await server
    .post("/urls/shorten")
    .set("Authorization", `Bearer ${token}`)
    .send(body);

   expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
   it("Should response with status 201 and shortUrl data", async () => {
    const token = await generateValidToken();
    const body = { url: faker.internet.url() };
    const response = await server
     .post("/urls/shorten")
     .set("Authorization", `Bearer ${token}`)
     .send(body);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
   });
  });
 });
});

describe("GET /urls/:id", () => {
 const generateValidUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
 });
 const generateValidUrl = (userId: number) => ({
  url: faker.internet.url(),
  shortUrl: faker.lorem.word(8),
  id_user: userId,
 });
 it("Should response with status 404 if doesnt exist url for given id", async () => {
  const bodyUser = generateValidUser();
  const user = await createUser(bodyUser);
  const bodyUrl = generateValidUrl(user.id);
  await createUrl(bodyUrl);

  const response = await server.get("/urls/0");

  expect(response.status).toBe(httpStatus.NOT_FOUND);
 });

 it("Should response with status 200 and url data", async () => {
  const bodyUser = generateValidUser();
  const user = await createUser(bodyUser);
  const bodyUrl = generateValidUrl(user.id);
  const url = await createUrl(bodyUrl);

  const response = await server.get(`/urls/${url.id}`);

  expect(response.status).toBe(httpStatus.OK);
  expect(response.body).toEqual({
   id: url.id,
   shortUrl: url.shortUrl,
   url: url.url,
  });
 });
});

describe("GET /urls/open/:shortUrl", () => {
 const generateValidUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
 });
 const generateValidUrl = (userId: number) => ({
  url: faker.internet.url(),
  shortUrl: faker.lorem.word(8),
  id_user: userId,
 });
 it("Should response with status 404 if given shortUrl doesnt exist", async () => {
  const bodyUser = generateValidUser();
  const user = await createUser(bodyUser);
  const bodyUrl = generateValidUrl(user.id);
  await createUrl(bodyUrl);
  const shortUrl = faker.lorem.word(8);
  const response = await server.get(`/urls/open/${shortUrl}`);
  expect(response.status).toBe(httpStatus.NOT_FOUND);
 });

 it("Should redirect to url", async () => {
  const bodyUser = generateValidUser();
  const user = await createUser(bodyUser);
  const bodyUrl = generateValidUrl(user.id);
  const url = await createUrl(bodyUrl);

  const response = await server.get(`/urls/open/${url.shortUrl}`);

  const urlCount = await prisma.urls.findFirst({
   where: {
    id: url.id,
   },
  });
  expect(response.redirect).toBeDefined();
  expect(urlCount.count).toBe(url.count + 1);
 });
});

describe("DELETE /urls/:id", () => {
 const generateValidUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
 });
 const generateValidUrl = (userId: number) => ({
  url: faker.internet.url(),
  shortUrl: faker.lorem.word(8),
  id_user: userId,
 });
 it("Should response with status 401 if token is not given", async () => {
  const response = await server.post("/urls/shorten");

  expect(response.status).toBe(401);
 });

 it("Should response with status 401 if given token is not valid", async () => {
  const token = faker.lorem.word();
  const response = await server
   .delete("/urls/0")
   .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(401);
 });

 it("Should response with status 401 if given token has no session", async () => {
  const userWithoutSession = await createUser();
  const token = jwt.sign(
   { userId: userWithoutSession.id },
   process.env.JWT_SECRET
  );
  const response = await server
   .delete("/urls/0")
   .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(401);
 });

 describe("when token is valid", () => {
  it("Should response with status 404 if given id doesnt exist", async () => {
   const bodyUser = generateValidUser();
   const user = await createUser(bodyUser);
   const bodyUrl = generateValidUrl(user.id);
   const url = await createUrl(bodyUrl);
   const token = await generateValidToken(user)
   const response = await server
    .delete(`/urls/0`)
    .set("Authorization", `Bearer ${token}`);
   expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should response with status 401 if url doesnt belong to user", async () => {
    const bodyUser = generateValidUser();
    const user = await createUser(bodyUser);
    const bodyUrl = generateValidUrl(user.id);
    const url = await createUrl(bodyUrl);
    const token = await generateValidToken()
    const response = await server
     .delete(`/urls/${url.id}`)
     .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
   });

   it("Should response with status 204", async () => {
    const bodyUser = generateValidUser();
    const user = await createUser(bodyUser);
    const bodyUrl = generateValidUrl(user.id);
    const url = await createUrl(bodyUrl);
    const token = await generateValidToken(user)
    const response = await server
     .delete(`/urls/${url.id}`)
     .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.NO_CONTENT);
   });
 });
});
