import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product } from "../../../domain/entities/Product";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    id: string,
    data: Partial<{
      name: string;
      price: number;
      description: string;
      category: string;
      imageUrl: string;
      showInDiary: boolean;
    }>
  ): Promise<Product> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Producto no encontrado");
    }
    return this.productRepository.update(id, data);
  }
}
