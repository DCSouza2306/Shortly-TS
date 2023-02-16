import { cleanDb } from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import faker from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import jwt from "jsonwebtoken";
import { generateValidToken } from "../helpers";

beforeAll(async () => {
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
    const body = { "url": faker.internet.url() };
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
