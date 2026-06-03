import { Request, Response, NextFunction } from "express";
import { PrismaOrderRepository } from "../../infrastructure/repositories/PrismaOrderRepository";
import { PrismaCartRepository } from "../../infrastructure/repositories/PrismaCartRepository";
import { CreateOrder } from "../../application/usecases/orders/CreateOrder";
import { GetOrders } from "../../application/usecases/orders/GetOrders";
import { GetOrderById } from "../../application/usecases/orders/GetOrderById";
import { PayOrder } from "../../application/usecases/orders/PayOrder";

const orderRepository = new PrismaOrderRepository();
const cartRepository = new PrismaCartRepository();

const createOrder = new CreateOrder(orderRepository, cartRepository);
const getOrders = new GetOrders(orderRepository);
const getOrderById = new GetOrderById(orderRepository);
const payOrder = new PayOrder(orderRepository);

export const ordersController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const order = await createOrder.execute(userId, req.body);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const role = req.user!.role;
      const orders = await getOrders.execute(userId, role);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const role = req.user!.role;
      const order = await getOrderById.execute(req.params.id, userId, role);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  },

  async pay(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const role = req.user!.role;
      const order = await payOrder.execute(req.params.id, userId, role);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
};
