import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../service/user-service";
import { CreateUserParams } from "../service/user-service";

export async function usersPost(req: Request, res: Response) {
 const { name, email, password } = req.body as CreateUserParams;
 const user = { name, email, password };

 try {
  await userService.postUser(user);

  res.sendStatus(httpStatus.CREATED);
 } catch (e) {
    if(e.name == "DuplicatedEmailError") return res.sendStatus(httpStatus.CONFLICT)
 }
}
