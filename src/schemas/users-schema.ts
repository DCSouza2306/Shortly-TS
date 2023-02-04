import joi from "joi";
import { CreateUserParams } from "../service/user-service";

export const createUserSchema = joi.object<CreateUserParams>({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})