import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  token: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.token;
  if (token) {
    next();
  } else {
    res.sendStatus(403);
  }
};
