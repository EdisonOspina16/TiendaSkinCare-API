import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product } from "../../../domain/entities/Product";

export class GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(filters?: { category?: string; showInDiary?: boolean }): Promise<Product[]> {
    return this.productRepository.findAll(filters);
  }
}
