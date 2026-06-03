import { CartRepository } from "../../../domain/repositories/CartRepository";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Cart } from "../../../domain/entities/Cart";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class AddToCart {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(userId: string, productId: string, quantity: number): Promise<Cart> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }

    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }

    return this.cartRepository.addItem(cart.id, productId, quantity);
  }
}
