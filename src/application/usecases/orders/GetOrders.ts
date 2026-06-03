import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Order } from "../../../domain/entities/Order";

export class GetOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string, role: string): Promise<Order[]> {
    if (role === "ADMIN") {
      return this.orderRepository.findAll();
    }
    return this.orderRepository.findByUserId(userId);
  }
}
