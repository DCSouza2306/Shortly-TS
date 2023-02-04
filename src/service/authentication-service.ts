import { users } from "@prisma/client";
import { invalideCredentialsError } from "../errors/invalid-credentials-error";
import authenticationRepository from "../repositories/authentication-repository";
import sessionRepository from "../repositories/session-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

async function signInPost(params: InputUserParams) {
 const user = await findUserOrFail(params.email);
 await validatePasswordOrFail(params.password, user.password);

const token = await createSession(user.id);
return token
}

async function findUserOrFail(email: string) {
 const userExist = await authenticationRepository.findByEmail(email);
 if (!userExist) {
  throw invalideCredentialsError();
 }
 return userExist;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
 const isPasswordValid = await bcrypt.compare(password, userPassword);
 if (!isPasswordValid) throw invalideCredentialsError();
}

async function createSession(userId: number){
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    await sessionRepository.create({
        token,
        id_user: userId
    });

    return token;
}

export type InputUserParams = Pick<users, "email" | "password">;

const authenticationService = {
 signInPost,
};

export default authenticationService;
