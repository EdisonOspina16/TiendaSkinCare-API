import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class GetProfile {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.role,
      user.createdAt,
      user.updatedAt
    );
  }
}
