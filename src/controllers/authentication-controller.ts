import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService from "../service/authentication-service";
import { InputUserParams } from "../service/authentication-service";

export async function signInPost(req: Request, res: Response) {
 const user: InputUserParams = req.body;

 try {
  const token = await authenticationService.signInPost(user);
  return res.status(httpStatus.OK).send(token);
 } catch (e) {
    if(e.name == "InvalidCredentialsError") return res.sendStatus(httpStatus.UNAUTHORIZED)
 }
}
