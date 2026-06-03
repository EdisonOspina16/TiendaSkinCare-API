import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product } from "../../../domain/entities/Product";
import { NotFoundError } from "../../../domain/errors/DomainError";

export class GetProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }
    return product;
  }
}
