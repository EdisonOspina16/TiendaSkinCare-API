import { JwtPayload } from "../../domain/services/JwtService";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
