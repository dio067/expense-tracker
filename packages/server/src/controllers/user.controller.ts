import { Response, Request } from "express";
import prisma from "../lib/prisma";
import { toPublicUser } from "@/lib";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: {},
        });
      }
      return res.status(200).json({
        ok: true,
        data: toPublicUser(user),
        message: "User data fetched successfully",
      });
    } catch (err) {
      console.error("User fetching unsuccessful", err);
      return res.status(500).json({
        ok: false,
        message: "User fetching unsuccessful",
        data: null,
      });
    }
  },
  editUser: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res
          .status(401)
          .json({ ok: false, message: "Unauthorized", data: null });
      }

      const { name, income, balance, age } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { name, income, balance, age },
      });
      return res.status(200).json({
        ok: true,
        data: toPublicUser(user),
        message: "User data altered successfully",
      });
    } catch (err) {
      console.error("User altering unsuccessful", err);
      return res.status(500).json({
        ok: false,
        message: "User altering unsuccessful",
        data: null,
      });
    }
  },
};

export const { getUser, editUser } = userController;
