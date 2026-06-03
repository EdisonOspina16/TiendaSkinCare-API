import { Request, Response, NextFunction } from "express";
import { PrismaCartRepository } from "../../infrastructure/repositories/PrismaCartRepository";
import { PrismaProductRepository } from "../../infrastructure/repositories/PrismaProductRepository";
import { AddToCart } from "../../application/usecases/cart/AddToCart";
import { RemoveFromCart } from "../../application/usecases/cart/RemoveFromCart";
import { UpdateCartItem } from "../../application/usecases/cart/UpdateCartItem";
import { GetCart } from "../../application/usecases/cart/GetCart";

const cartRepository = new PrismaCartRepository();
const productRepository = new PrismaProductRepository();

const addToCart = new AddToCart(cartRepository, productRepository);
const removeFromCart = new RemoveFromCart(cartRepository);
const updateCartItem = new UpdateCartItem(cartRepository);
const getCart = new GetCart(cartRepository);

export const cartController = {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const cart = await getCart.execute(userId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  },

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { productId, quantity } = req.body;
      const cart = await addToCart.execute(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { productId, quantity } = req.body;
      const cart = await updateCartItem.execute(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const productId = req.params.productId;
      const cart = await removeFromCart.execute(userId, productId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }
};
