import { Request, Response, NextFunction } from "express";

export function validateDto(validationFn: (body: any) => void) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      validationFn(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}
