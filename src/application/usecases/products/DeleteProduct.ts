import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Producto no encontrado");
    }
    return this.productRepository.delete(id);
  }
}
