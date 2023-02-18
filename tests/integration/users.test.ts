import {
 cleanDb,
 generateManyUrls,
 generateManyUsersAndUrls,
 generateValidToken,
 generateValidTokenWithInvalidUser,
 generateValidUrl,
 generateValidUser,
} from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import faker from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import httpStatus from "http-status";
import { createUrl } from "../factories/url-factory";
import jwt from "jsonwebtoken";

beforeEach(async () => {
 await cleanDb();
});

const server = supertest(app);

describe("POST /users", () => {
 it("Shoul response with status 422 when body is missing", async () => {
  const response = await server.post("/users");

  expect(response.status).toBe(422);
 });

 it("Shoul response with status 422 when body is invalid", async () => {
  const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  const response = await server.post("/users").send(invalidBody);

  expect(response.status).toBe(422);
 });

 describe("when body is valid", () => {
  it("Should response with status 409 when email is already registred", async () => {
   const body = generateValidUser();

   await createUser(body);

   const response = await server.post("/users").send(body);

   expect(response.status).toBe(409);
  });

  it("Should response with status 201 when body is valid", async () => {
   const body = generateValidUser();

   const response = await server.post("/users").send(body);

   expect(response.status).toBe(201);
  });
 });
});

describe("GET /users/ranking", () => {
 it("Should response with status 200 and ranking of urls", async () => {
  await generateManyUsersAndUrls();

  const response = await server.get("/users/ranking");

  expect(response.status).toBe(httpStatus.OK);
  expect(response.body).toBeDefined();
  expect(expect(response.body).toHaveLength(10)).toBeUndefined();
 });
});

describe("GET /users/me", () => {
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
  it("Should response with status 404 when user not found", async () => {
   const token = await generateValidTokenWithInvalidUser();

   const response = await server
    .get("users/me")
    .set("Authorization", `Bearer ${token}`);

   expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should response with status 200 and urls from user", async () => {
   const bodyUser = generateValidUser();
   const user = await createUser(bodyUser);
   await generateManyUrls(user.id);

   const token = await generateValidToken(user);

   const response = await server
    .get("/users/me")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toBeDefined()
  });
 });
});
