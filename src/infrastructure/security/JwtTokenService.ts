import jwt from "jsonwebtoken";
import { JwtService, JwtPayload } from "../../domain/services/JwtService";
import { jwtConfig } from "../config/jwt";

export class JwtTokenService implements JwtService {
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    } as jwt.SignOptions);
  }

  verify(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret) as jwt.JwtPayload;
      if (decoded && typeof decoded === "object" && "userId" in decoded && "role" in decoded) {
        return {
          userId: decoded.userId,
          role: decoded.role
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}
