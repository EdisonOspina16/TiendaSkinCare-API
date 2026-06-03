import { Product } from "./Product";

export class CartItem {
  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly product?: Product
  ) {}
}
