import { NextFunction, Request, Response } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.session;

  if (!userId) return res.sendStatus(401);
  return next();
};

export default requireAuth;
