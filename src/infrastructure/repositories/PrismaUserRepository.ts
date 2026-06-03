import { User, UserRole } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { prisma } from "../prisma/prisma-client";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  private mapToEntity(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.role as UserRole,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.password
    );
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { id } });
    return prismaUser ? this.mapToEntity(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({ where: { email } });
    return prismaUser ? this.mapToEntity(prismaUser) : null;
  }

  async create(user: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): Promise<User> {
    const prismaUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password || "",
        role: user.role
      }
    });
    return this.mapToEntity(prismaUser);
  }

  async update(id: string, user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User> {
    const prismaUser = await prisma.user.update({
      where: { id },
      data: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
    return this.mapToEntity(prismaUser);
  }
}
