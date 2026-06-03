import { User } from "../entities/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): Promise<User>;
  update(id: string, user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User>;
}
