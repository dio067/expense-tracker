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
    const { id } = (req as any).params;
    const userId = (req as any).userId;

    try {
      const expense = await prisma.expenses.findUnique({
        where: { id: parseInt(id), userId },
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

    if (!amount || !description || !category)
      return res.status(400).json({
        ok: false,
        message: "All fields are mandatory",
        data: null,
      });
    try {
      const expense = await prisma.expenses.create({
        data: {
          userId,
          amount,
          description,
          category,
        },
      });
