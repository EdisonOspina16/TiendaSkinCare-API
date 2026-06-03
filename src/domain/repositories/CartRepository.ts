import { Cart } from "../entities/Cart";

export interface CartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  create(userId: string): Promise<Cart>;
  addItem(cartId: string, productId: string, quantity: number): Promise<Cart>;
  removeItem(cartId: string, productId: string): Promise<Cart>;
  updateItemQuantity(cartId: string, productId: string, quantity: number): Promise<Cart>;
  clear(cartId: string): Promise<void>;
}
