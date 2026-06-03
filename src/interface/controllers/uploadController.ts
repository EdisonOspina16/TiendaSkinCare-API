import { Request, Response, NextFunction } from "express";
import { SupabaseStorageService } from "../../infrastructure/storage/SupabaseStorageService";
import { UploadProductImage } from "../../application/usecases/uploads/UploadProductImage";

const storageService = new SupabaseStorageService();
const uploadProductImage = new UploadProductImage(storageService);

export const uploadController = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const uploadedFile = await uploadProductImage.execute(file as any);
      res.status(200).json(uploadedFile);
    } catch (err) {
      next(err);
    }
  }
};
