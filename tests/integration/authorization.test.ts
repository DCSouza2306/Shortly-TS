import { cleanDb } from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import faker from "@faker-js/faker";
import { createUser } from "../factories/user-factory";

beforeAll(async () => {
 await cleanDb();
});

const server = supertest(app);

describe("POST /auth/signin", () => {
 it("Should response with status 422 when body is not give", async () => {
  const response = await server.post("/auth/signin");
  expect(response.status).toBe(422);
 });

 it("Should response with status 422 when body is not valid", async () => {
  const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  const response = await server.post("/auth/signin").send(invalidBody);

  expect(response.status).toBe(422);
 });

 describe("when body is valid", () => {
  const generateValidBodySignIn = () => ({
   email: faker.internet.email(),
   password: faker.internet.password(6),
  });

  const generateValidBodySignUp = () => ({
   name: faker.name.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password(6),
  });

  it("Should response with status 401 when there is no user for given email", async () => {
   const body = generateValidBodySignIn();
   const response = await server.post("/auth/signin").send(body);

   expect(response.status).toBe(401);
  });

  it("Should response with status 401 when there is an user for email but passoword is not correct", async () => {
   const body = generateValidBodySignUp();
   await createUser(body);
   const response = await server.post("/auth/signin").send({
    email: body.email,
    password: faker.lorem.word(6),
   });
   expect(response.status).toBe(401);
  });

  describe("when credentials are valid", () => {
   it("Should response with status 200", async () => {
    const body = generateValidBodySignUp();
    await createUser(body);
    const user = {
     email: body.email,
     password: body.password,
    };
    const response = await server.post("/auth/signin").send(user);
    expect(response.status).toBe(200);
   });

   it("Should response with token", async () => {
    const body = generateValidBodySignUp();
    await createUser(body);
    const user = {
     email: body.email,
     password: body.password,
    };
    const response = await server.post("/auth/signin").send(user);
    expect(response.body).toBeDefined();
   });
  });
 });
});
