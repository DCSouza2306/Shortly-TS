import { AutenticateRequest } from "../middlewares/authentication-middleware";
import { Response, Request } from "express";
import { CreateUrlParams } from "../protocols";
import httpStatus from "http-status";
import urlsService from "../service/urls-service";

export async function postUrl(req: AutenticateRequest, res: Response) {
 const { url } = req.body as CreateUrlParams;
 const userId = req.userId;

 try {
  const shorten = await urlsService.postUrl(url, userId);
  res.status(httpStatus.CREATED).send(shorten);
 } catch (e) {
  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
 }
}
