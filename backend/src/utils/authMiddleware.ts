import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(403);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  getAuth()
    .verifyIdToken(token)
    .then((decodedToken) => next())
    .catch((err) => res.sendStatus(403));
};
