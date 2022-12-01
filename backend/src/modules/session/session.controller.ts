import { Request, Response } from "express";
import logger from "../../utils/logger";
import { CreateSessionInput, GetSessionIdInput, Id } from "./session.dto";
import { createSession, getCookie } from "./session.service";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput["body"]>,
  res: Response
) {
  try {
    const { email, candidatePassword } = req.body;
    const session = await createSession({ email, candidatePassword });
    if (session) {
      req.session.userId = session;
      console.log(req.session.userId);
      return res.send({
        success: true,
        session: req.sessionID,
        userId: req.session.userId,
      });
    }
    return res.status(401).send({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export function deleteSessionHandler(req: Request, res: Response) {
  const cookieName = getCookie();
  try {
    req.session.destroy((error) => {
      if (error) {
        logger.error(error);
        res.status(500).send(error.message);
      }
      res.clearCookie(cookieName);
      return res.status(200).send("OK");
    });
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export function getSessionHandler(req: Request, res: Response) {
  const userId = req.session.userId;
  try {
    if (userId) {
      return res.send(userId);
    }
    return res.status(404).send("User not found");
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}
