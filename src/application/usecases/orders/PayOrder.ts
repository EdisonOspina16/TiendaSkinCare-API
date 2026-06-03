import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Order } from "../../../domain/entities/Order";
import { ValidationError, NotFoundError, UnauthorizedError } from "../../../domain/errors/DomainError";

export class PayOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, userId: string, role: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError(`Pedido con ID ${orderId} no encontrado`);
    }

    // Authorization check: User must be the owner of the order OR an ADMIN
    if (order.userId !== userId && role !== "ADMIN") {
      throw new UnauthorizedError("No tienes permiso para pagar este pedido");
    }

    if (order.status === "PAID") {
      throw new ValidationError("El pedido ya está pagado");
    }

    // Update status to PAID
    return this.orderRepository.updateStatus(orderId, "PAID");
  }
}
