import { Order, OrderItem } from "../../domain/entities/Order";
import { Product } from "../../domain/entities/Product";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { prisma } from "../prisma/prisma-client";

export class PrismaOrderRepository implements OrderRepository {
  private mapToEntity(o: any): Order {
    const items = (o.items || []).map((item: any) => {
      const product = item.product
        ? new Product(
            item.product.id,
            item.product.name,
            item.product.price,
            item.product.description,
            item.product.category,
            item.product.imageUrl,
            item.product.showInDiary,
            item.product.createdAt,
            item.product.updatedAt
          )
        : undefined;

      return new OrderItem(
        item.id,
        item.orderId,
        item.productId,
        item.price,
        item.quantity,
        product
      );
    });

    return new Order(
      o.id,
      o.userId,
      o.total,
      o.status,
      o.address,
      o.phone,
      items,
      o.createdAt,
      o.updatedAt
    );
  }

  async create(order: {
    userId: string;
    total: number;
    address: string;
    phone: string;
    items: { productId: string; price: number; quantity: number }[];
  }): Promise<Order> {
    const created = await prisma.order.create({
      data: {
        userId: order.userId,
        total: order.total,
        address: order.address,
        phone: order.phone,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Order | null> {
    const o = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return o ? this.mapToEntity(o) : null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return orders.map((o) => this.mapToEntity(o));
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return orders.map((o) => this.mapToEntity(o));
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return this.mapToEntity(updated);
  }
}
