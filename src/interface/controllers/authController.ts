import { Request, Response, NextFunction } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { PrismaCartRepository } from "../../infrastructure/repositories/PrismaCartRepository";
import { BcryptPasswordHasher } from "../../infrastructure/security/BcryptPasswordHasher";
import { JwtTokenService } from "../../infrastructure/security/JwtTokenService";
import { RegisterUser } from "../../application/usecases/auth/RegisterUser";
import { LoginUser } from "../../application/usecases/auth/LoginUser";
import { GetProfile } from "../../application/usecases/auth/GetProfile";
import { UpdateProfile } from "../../application/usecases/auth/UpdateProfile";

const userRepository = new PrismaUserRepository();
const cartRepository = new PrismaCartRepository();
const passwordHasher = new BcryptPasswordHasher();
const jwtService = new JwtTokenService();

const registerUser = new RegisterUser(userRepository, cartRepository, passwordHasher);
const loginUser = new LoginUser(userRepository, passwordHasher, jwtService);
const getProfile = new GetProfile(userRepository);
const updateProfile = new UpdateProfile(userRepository);

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginUser.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await getProfile.execute(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await updateProfile.execute(userId, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
};
