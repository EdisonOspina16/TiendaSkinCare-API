import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: {
    userId: string;
    total: number;
    address: string;
    phone: string;
    items: { productId: string; price: number; quantity: number }[];
  }): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  updateStatus(id: string, status: string): Promise<Order>;
}
