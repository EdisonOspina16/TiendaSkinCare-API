import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../domain/errors/DomainError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      error: err.message
    });
    return;
  }

  console.error("Internal Server Error:", err);
  res.status(500).json({
    error: "Ocurrió un error interno en el servidor"
  });
}
