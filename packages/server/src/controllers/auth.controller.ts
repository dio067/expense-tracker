import { Request, Response } from "express";
import { toPublicUser, prisma } from "../lib";
import {
  refresh,
  refresh_expires_in,
  secret,
  secret_expires_in,
  node_env,
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
          .status(404)
          .json({ ok: false, message: "Email does not exist", data: null });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ ok: false, message: "Password Invalid", data: null });
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
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: "none",
      });

      return res.status(200).json({
        ok: true,
        message: "Successfully Logged In",
        data: toPublicUser(user),
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

  register: async (req: Request, res: Response) => {
    const { name, email, password, age } = req.body;
    try {
      const isEmailExist = await prisma.user.findUnique({
        where: { email },
      });

      if (isEmailExist) {
        return res.status(409).json({
          ok: false,
          message: "Email already exist",
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const accessToken = jwt.sign({ userId: newUser.id }, secret, {
        expiresIn: secret_expires_in as any,
      });

      const refreshToken = jwt.sign({ userId: newUser.id }, refresh, {
        expiresIn: refresh_expires_in as any,
      });

      await prisma.user.update({
        where: { email },
        data: { refreshToken },
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: "none",
      });
      return res.status(200).json({
        ok: true,
        message: "Successfully Registered",
        data: toPublicUser(newUser),
      });
    } catch (err) {
      console.error("Register Failed", err);
      return res.status(500).json({
        ok: false,
        message: "Register Failed",
        data: null,
      });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { refreshToken: null },
        });
      }

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({
        ok: true,
        message: "Successfully Logged Out",
        data: null,
      });
    } catch (err) {
      console.error("Logout Failed", err);

      return res.status(500).json({
        ok: false,
        message: "Logout Failed",
        data: null,
      });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const refreshToken = req.cookies.refreshToken;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user?.refreshToken) {
        return res.status(401).json({
          ok: false,
          message: "Refresh token not found",
          data: null,
        });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(401).json({
          ok: false,
          message: "Invalid refresh token",
          data: null,
        });
      }

      const newAccessToken = jwt.sign({ userId: user.id }, secret, {
        expiresIn: secret_expires_in as any,
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
      });
      const newRefreshToken = jwt.sign({ userId: user.id }, refresh, {
        expiresIn: refresh_expires_in as any,
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: node_env === "production",
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: node_env === "production" ? "none" : "lax",
      });

      return res.status(200).json({
        ok: true,
        message: "Access Token refreshed successfully",
      });
    } catch (err) {
      console.error("Access Token refresh unsuccessful", err);

      return res.status(500).json({
        ok: false,
        message: "Access Token refresh unsuccessful",
        data: null,
      });
    }
  },
};

export const { login, register, logout, refreshToken } = authController;
