import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CartRepository } from "../../../domain/repositories/CartRepository";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";
import { User } from "../../../domain/entities/User";
import { ConflictError } from "../../../domain/errors/DomainError";

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cartRepository: CartRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: any): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError("El correo electrónico ya está registrado");
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);
    const user = await this.userRepository.create({
      email: input.email,
      name: input.name,
      role: "USER",
      password: hashedPassword
    });

    // Create a cart for the new user
    await this.cartRepository.create(user.id);

    return user;
  }
}
