import { Router } from "express";
import { cartController } from "../../controllers/cartController";
import { validateDto } from "../../middlewares/validateDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SchemaValidator } from "../../../infrastructure/validators/schema.validator";

const router = Router();

router.use(authMiddleware);

router.get("/", cartController.get);
router.post("/", validateDto(SchemaValidator.validateAddToCart), cartController.add);
router.put("/", validateDto(SchemaValidator.validateAddToCart), cartController.update);
router.delete("/:productId", cartController.remove);

export default router;
