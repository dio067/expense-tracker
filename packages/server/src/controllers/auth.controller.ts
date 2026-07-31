import { Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  refresh,
  refresh_expires_in,
  secret,
  secret_expires_in,
  node_env,
} from "../config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { error } from "node:console";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res
          .status(404)
          .json({ ok: false, message: "Email does not exist", data: null });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ ok: false, message: "Invalid credentials", data: null });
      }

      const accessToken = jwt.sign({ userId: user.id }, secret, {
        expiresIn: secret_expires_in as any,
      });

      const refreshToken = jwt.sign({ userId: user.id }, refresh, {
        expiresIn: refresh_expires_in as any,
      });

      await prisma.user.update({
        where: { email },
        data: { refreshToken },
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "strict",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: "strict",
      });

      return res.status(200).json({
        ok: true,
        data: {
          userId: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Login Failed", err);
      return res.status(500).json({
        ok: false,
        message: "Login Failed",
        data: null,
      });
    }
  },
};
