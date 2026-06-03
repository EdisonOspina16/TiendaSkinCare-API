import { CartRepository } from "../../../domain/repositories/CartRepository";
import { Cart } from "../../../domain/entities/Cart";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class UpdateCartItem {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new NotFoundError("Carrito no encontrado");
    }

    return this.cartRepository.updateItemQuantity(cart.id, productId, quantity);
  }
}
