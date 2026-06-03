import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../domain/errors/DomainError";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
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
