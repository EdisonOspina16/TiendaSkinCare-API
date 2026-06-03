import { Request, Response, NextFunction } from "express";
import { PrismaProductRepository } from "../../infrastructure/repositories/PrismaProductRepository";
import { CreateProduct } from "../../application/usecases/products/CreateProduct";
import { UpdateProduct } from "../../application/usecases/products/UpdateProduct";
import { DeleteProduct } from "../../application/usecases/products/DeleteProduct";
import { GetProductById } from "../../application/usecases/products/GetProductById";
import { GetProducts } from "../../application/usecases/products/GetProducts";

const productRepository = new PrismaProductRepository();

const createProduct = new CreateProduct(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);
const getProductById = new GetProductById(productRepository);
const getProducts = new GetProducts(productRepository);

export const productsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const showInDiaryStr = req.query.showInDiary as string | undefined;
      
      let showInDiary: boolean | undefined = undefined;
      if (showInDiaryStr === "true") showInDiary = true;
      if (showInDiaryStr === "false") showInDiary = false;

      const products = await getProducts.execute({ category, showInDiary });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await getProductById.execute(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await createProduct.execute(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await updateProduct.execute(req.params.id, req.body);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteProduct.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
