import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { refresh, secret } from "../config";

interface decodedToken {
  userId: number;
}

const authMiddlewares = {
  authenticateUser: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ ok: false, message: "No access token provided", data: null });
    }
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

  refreshTokenValidation: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ ok: false, message: "No refresh token provided", data: null });
    }
    try {
      const decodedToken = jwt.verify(refreshToken, refresh) as {
        userId: number;
      };

      (req as any).userId = decodedToken.userId;

      next();
    } catch (err) {
      console.error("Refresh Token authentication failed:", err);

      return res.status(401).json({
        ok: false,
        message: "Invalid or expired refresh token",
        data: null,
      });
    }
  },
};

export const { authenticateUser, refreshTokenValidation } = authMiddlewares;
