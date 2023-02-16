import { Request, Response } from "express";
import httpStatus from "http-status";
import { AutenticateRequest } from "../middlewares/authentication-middleware";
import urlsRepository from "../repositories/urls-repository";
import urlsService from "../service/urls-service";
import userService from "../service/user-service";
import { CreateUserParams } from "../service/user-service";

export async function usersPost(req: Request, res: Response) {
 const user = req.body as CreateUserParams;

 try {
  await userService.postUser(user);

  res.sendStatus(httpStatus.CREATED);
 } catch (e) {
    if(e.name == "DuplicatedEmailError") return res.sendStatus(httpStatus.CONFLICT)
 }
}

export async function getUrls(req: AutenticateRequest, res: Response){
   const userId = req.userId
   try{
      const urls = await urlsService.findAll(userId);
      res.status(httpStatus.OK).send(urls)
   } catch(e){
      res.sendStatus(httpStatus.NOT_FOUND)
   }
}
