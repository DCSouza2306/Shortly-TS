import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "../errors/unauthorized-error";
import jwt from "jsonwebtoken";
import prisma from "../data/database";

export async function authenticateToken(
 req: AutenticateRequest,
 res: Response,
 next: NextFunction
) {
 const authHeader = req.header("Authorization");
 if (!authHeader)
  return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

 const token = authHeader.split(" ")[1];
 if (!token)
  return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

 try {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

  const session = await prisma.sessions.findFirst({
   where: { token },
  });

  if (!session)
   return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());

  req.userId = userId;
  return next();
 } catch (e) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
 }
}

export type AutenticateRequest = Request & JwtPayload;

type JwtPayload = {
 userId: number;
};
