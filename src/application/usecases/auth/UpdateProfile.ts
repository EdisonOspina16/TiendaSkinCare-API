import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class UpdateProfile {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, data: { name?: string; email?: string }): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    const updated = await this.userRepository.update(userId, data);
    return new User(
      updated.id,
      updated.email,
      updated.name,
      updated.role,
      updated.createdAt,
      updated.updatedAt
    );
  }
}
