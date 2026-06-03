import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Order } from "../../../domain/entities/Order";
import { NotFoundError, ForbiddenError } from "../../../domain/errors/DomainError";

export class GetOrderById {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, userId: string, role: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Pedido no encontrado");
    }

    if (role !== "ADMIN" && order.userId !== userId) {
      throw new ForbiddenError("No tiene permiso para ver este pedido");
    }

    return order;
  }
}
