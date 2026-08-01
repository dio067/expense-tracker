import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { secret } from "../config";

interface decodedToken {
  userId: string;
}

const authMiddlewares = {
  authenticateUser: async (req: Request, res: Response, next: NextFunction) => {
    const token = (req as any).cookies.accessToken;

    try {
      const decodedToken = jwt.verify(token, secret) as decodedToken;

      (req as any).userId = decodedToken.userId;

      next();
    } catch (err) {
      console.error("Invalid access token", err);
      return res.status(401).json({
        ok: false,
        message: "Invalid access token",
        data: null,
      });
    }
  },
};
