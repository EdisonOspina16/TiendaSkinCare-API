import { Router } from "express";
import { ordersController } from "../../controllers/ordersController";
import { validateDto } from "../../middlewares/validateDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SchemaValidator } from "../../../infrastructure/validators/schema.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateDto(SchemaValidator.validateCreateOrder), ordersController.create);
router.get("/", ordersController.getAll);
router.get("/:id", ordersController.getById);
router.post("/:id/pay", ordersController.pay);

export default router;
