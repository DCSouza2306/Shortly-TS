import joi from "joi";
import { CreateUrlParams } from "../protocols";

export const urlSchema = joi.object<CreateUrlParams>({
 url: joi.string().required(),
});
