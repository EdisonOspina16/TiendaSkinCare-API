import { CartRepository } from "../../../domain/repositories/CartRepository";
import { Cart } from "../../../domain/entities/Cart";

export class GetCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }
    return cart;
  }
}
