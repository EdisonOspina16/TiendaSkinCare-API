import { Cart } from "../../domain/entities/Cart";
import { CartItem } from "../../domain/entities/CartItem";
import { Product } from "../../domain/entities/Product";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { prisma } from "../prisma/prisma-client";

export class PrismaCartRepository implements CartRepository {
  private mapToEntity(prismaCart: any): Cart {
    const items = (prismaCart.items || []).map((item: any) => {
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

      return new CartItem(
        item.id,
        item.cartId,
        item.productId,
        item.quantity,
        product
      );
    });

    return new Cart(
      prismaCart.id,
      prismaCart.userId,
      items,
      prismaCart.createdAt,
      prismaCart.updatedAt
    );
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const c = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return c ? this.mapToEntity(c) : null;
  }

  async create(userId: string): Promise<Cart> {
    const created = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return this.mapToEntity(created);
  }

  async addItem(cartId: string, productId: string, quantity: number): Promise<Cart> {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId, productId }
      },
      update: {
        quantity: { increment: quantity }
      },
      create: {
        cartId,
        productId,
        quantity
      }
    });

    const updated = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return this.mapToEntity(updated!);
  }

  async removeItem(cartId: string, productId: string): Promise<Cart> {
    try {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: { cartId, productId }
        }
      });
    } catch {
      // Ignored
    }

    const updated = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return this.mapToEntity(updated!);
  }

  async updateItemQuantity(cartId: string, productId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      return this.removeItem(cartId, productId);
    }

    await prisma.cartItem.update({
      where: {
        cartId_productId: { cartId, productId }
      },
      data: { quantity }
    });

    const updated = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return this.mapToEntity(updated!);
  }

  async clear(cartId: string): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { cartId }
    });
  }
}
