import { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed",
        data: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
