import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { CartRepository } from "../../../domain/repositories/CartRepository";
import { Order } from "../../../domain/entities/Order";
import { ValidationError, NotFoundError } from "../../../domain/errors/DomainError";

export class CreateOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartRepository: CartRepository
  ) {}

  async execute(userId: string, data: { address: string; phone: string }): Promise<Order> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw new ValidationError("El carrito está vacío, no se puede crear un pedido");
    }

    let total = 0;
    const orderItems: { productId: string; price: number; quantity: number }[] = [];

    for (const item of cart.items) {
      if (!item.product) {
        throw new NotFoundError(`Producto ${item.productId} no encontrado en el carrito`);
      }
      total += item.product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        price: item.product.price,
        quantity: item.quantity
      });
    }

    const order = await this.orderRepository.create({
      userId,
      total,
      address: data.address,
      phone: data.phone,
      items: orderItems
    });

    // Clear the cart
    await this.cartRepository.clear(cart.id);

    return order;
  }
}
