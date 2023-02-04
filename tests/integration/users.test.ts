import { cleanDb } from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import faker from "@faker-js/faker";
import exp from "constants";
import { createUser } from "../factories/user-factory";

beforeAll(async () => {
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
  const generateValidBody = () => ({
   name: faker.name.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password(6),
   confirmPassword: faker.internet.password(6),
  });

  it("Should response with status 409 when email is already registred", async () => {
   const body = generateValidBody();

   await createUser(body);

   const response = await server.post("/users").send(body);

   expect(response.status).toBe(409);
  });


  it("Should response with status 201 when body is valid", async () => {
   const body = generateValidBody();

   const response = await server.post("/users").send(body);

   expect(response.status).toBe(201);
  });
 });
});
