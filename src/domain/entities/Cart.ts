import { CartItem } from "./CartItem";

export class Cart {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: CartItem[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
