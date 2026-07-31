import { Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  refresh,
  refresh_expires_in,
  secret,
  secret_expires_in,
} from "../config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res
          .status(500)
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
    } catch (err) {}
  },
};
