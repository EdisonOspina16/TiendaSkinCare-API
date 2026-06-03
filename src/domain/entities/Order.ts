import { Product } from "./Product";

export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly product?: Product
  ) {}
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly total: number,
    public readonly status: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly items: OrderItem[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
