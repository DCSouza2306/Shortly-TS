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

export async function getUrl(req: Request, res: Response) {
 const { id } = req.params;
 try {
  const url = await urlsService.getUrl(parseInt(id));
  res.status(httpStatus.OK).send(url);
 } catch (e) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function openUrl(req: Request, res: Response) {
 const { shortUrl } = req.params;

 try {
  const url = await urlsService.getShortUrl(shortUrl);
  res.redirect(`${url.url}`);
 } catch (e) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function deleteUrl(req: AutenticateRequest, res: Response) {
 const { id } = req.params;
 const userId = req.userId;
 try {
  await urlsService.deleteUrl(parseInt(id), userId);
  res.sendStatus(httpStatus.NO_CONTENT);
 } catch (e) {
  if (e.name == "NotFoundError") {
   return res.sendStatus(httpStatus.NOT_FOUND);
  }
  if (e.name == "UnauthorizedError") {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
   }
 }
}
