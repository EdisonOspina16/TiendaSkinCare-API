import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product } from "../../../domain/entities/Product";

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: {
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    showInDiary?: boolean;
  }): Promise<Product> {
    return this.productRepository.create({
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      imageUrl: data.imageUrl,
      showInDiary: data.showInDiary || false
    });
  }
}
