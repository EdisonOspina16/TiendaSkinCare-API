import { Router } from "express";
import { uploadController } from "../../controllers/uploadController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
import { uploadMiddleware } from "../../middlewares/uploadMiddleware";
import { storageMiddleware } from "../../middlewares/storageMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  storageMiddleware,
  uploadController.upload
);

export default router;
