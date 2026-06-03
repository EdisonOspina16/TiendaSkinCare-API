import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { prisma } from "../prisma/prisma-client";
import { Product as PrismaProduct } from "@prisma/client";

export class PrismaProductRepository implements ProductRepository {
  private mapToEntity(p: PrismaProduct): Product {
    return new Product(
      p.id,
      p.name,
      p.price,
      p.description,
      p.category,
      p.imageUrl,
      p.showInDiary,
      p.createdAt,
      p.updatedAt
    );
  }

  async findById(id: string): Promise<Product | null> {
    const p = await prisma.product.findUnique({ where: { id } });
    return p ? this.mapToEntity(p) : null;
  }

  async findAll(filters?: { category?: string; showInDiary?: boolean }): Promise<Product[]> {
    const where: any = {};
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.showInDiary !== undefined) {
      where.showInDiary = filters.showInDiary;
    }
    const products = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
    return products.map((p) => this.mapToEntity(p));
  }

  async create(p: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        description: p.description,
        category: p.category,
        imageUrl: p.imageUrl,
        showInDiary: p.showInDiary
      }
    });
    return this.mapToEntity(created);
  }

  async update(id: string, p: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>): Promise<Product> {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: p.name,
        price: p.price,
        description: p.description,
        category: p.category,
        imageUrl: p.imageUrl,
        showInDiary: p.showInDiary
      }
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
