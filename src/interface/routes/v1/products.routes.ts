import { Router } from "express";
import { productsController } from "../../controllers/productsController";
import { validateDto } from "../../middlewares/validateDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
import { SchemaValidator } from "../../../infrastructure/validators/schema.validator";

const router = Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.post("/", authMiddleware, adminMiddleware, validateDto(SchemaValidator.validateCreateProduct), productsController.create);
router.put("/:id", authMiddleware, adminMiddleware, validateDto(SchemaValidator.validateUpdateProduct), productsController.update);
router.delete("/:id", authMiddleware, adminMiddleware, productsController.delete);

export default router;
