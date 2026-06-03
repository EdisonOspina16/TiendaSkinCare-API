import { Request, Response, NextFunction } from "express";
import { JwtTokenService } from "../../infrastructure/security/JwtTokenService";
import { UnauthorizedError } from "../../domain/errors/DomainError";

const jwtService = new JwtTokenService();

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Token no proporcionado");
    }

    const token = authHeader.split(" ")[1];
    const payload = jwtService.verify(token);

    if (!payload) {
      throw new UnauthorizedError("Token inválido o expirado");
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}
