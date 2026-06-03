import { Product } from "../entities/Product";

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(filters?: { category?: string; showInDiary?: boolean }): Promise<Product[]>;
  create(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
  update(id: string, product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
