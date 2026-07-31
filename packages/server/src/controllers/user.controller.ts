import { Response, Request } from "express";
import prisma from "../lib/prisma";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          age: true,
        },
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
        data: { user },
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
};

export const { getUser } = userController;
