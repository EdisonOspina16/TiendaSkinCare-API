import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../domain/errors/DomainError";

export function storageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new ValidationError("No se subió ningún archivo");
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      throw new ValidationError("Formato de imagen no soportado (se permiten JPEG, PNG, WEBP, GIF)");
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const originalName = req.file.originalname.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some(ext => originalName.endsWith(ext));

    if (!hasAllowedExtension) {
      throw new ValidationError("Extensión de archivo no permitida");
    }

    next();
  } catch (err) {
    next(err);
  }
}
