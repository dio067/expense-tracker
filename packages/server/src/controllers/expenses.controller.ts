import prisma from "../lib/prisma";
import { Request, Response } from "express";
const expenseController = {
  getExpenses: async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    try {
      const expenses = await prisma.expenses.findMany({
        where: { userId },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({
        ok: true,
        message: "Data fetched successfully",
        data: expenses,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Data can't be fetched",
        data: null,
      });
    }
  },
  getExpense: async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const idParam = Number(req.params.id);

    if (!Number.isInteger(idParam)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid expense id", data: null });
    }

    try {
      const expense = await prisma.expenses.findUnique({
        where: { id: idParam, userId },
      });

      return res.status(200).json({
        ok: true,
        message: "Data fetched successfully",
        data: expense,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Data can't be fetched",
        data: null,
      });
    }
  },
  addExpense: async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { amount, description, category } = req.body;

    try {
      const expense = await prisma.expenses.create({
        data: {
          userId,
          amount,
          description,
          category,
        },
      });

      return res.status(201).json({
        ok: true,
        message: "Expense created successfully",
        data: expense,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: "Failed to create data ",
        data: null,
      });
    }
  },

  deleteExpense: async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const idParam = Number(req.params.id);
    if (!Number.isInteger(idParam)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid expense id", data: null });
    }

    try {
      const expense = await prisma.expenses.delete({
        where: { id: idParam, userId },
      });

      return res.status(200).json({
        ok: true,
        message: "Data deleted successfully",
        data: null,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Data can't be deleted",
        data: null,
      });
    }
  },

  updateExpense: async (req: Request, res: Response) => {
    const { description, amount, category } = req.body;
    const userId = (req as any).userId;
    const idParam = Number(req.params.id);

    if (!Number.isInteger(idParam)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid expense id", data: null });
    }

    try {
      const expense = await prisma.expenses.update({
        where: { id: idParam, userId },
        data: {
          description,
          amount,
          category,
        },
      });

      return res.status(200).json({
        ok: true,
        message: "Data altered successfully",
        data: expense,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Data can't be altered",
        data: null,
      });
    }
  },
};

export const {
  getExpense,
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = expenseController;
