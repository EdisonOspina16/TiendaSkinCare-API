import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../../domain/errors/DomainError";

export function adminMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.user) {
    throw new UnauthorizedError("Usuario no autenticado");
  }

  if (req.user.role !== "ADMIN") {
    throw new ForbiddenError("Acceso denegado: se requieren privilegios de administrador");
  }

  next();
}
