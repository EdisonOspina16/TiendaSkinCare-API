import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordHasher } from "../../../domain/services/PasswordHasher";
import { JwtService } from "../../../domain/services/JwtService";
import { UnauthorizedError } from "../../../domain/errors/DomainError";
import { User } from "../../../domain/entities/User";

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService
  ) {}

  async execute(input: any): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user || !user.password) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const passwordMatch = await this.passwordHasher.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role
    });

    // Return user without password
    const userWithoutPassword = new User(
      user.id,
      user.email,
      user.name,
      user.role,
      user.createdAt,
      user.updatedAt
    );

    return { user: userWithoutPassword, token };
  }
}
