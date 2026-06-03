import { Router } from "express";
import { authController } from "../../controllers/authController";
import { validateDto } from "../../middlewares/validateDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SchemaValidator } from "../../../infrastructure/validators/schema.validator";

const router = Router();

router.post("/register", validateDto(SchemaValidator.validateRegister), authController.register);
router.post("/login", validateDto(SchemaValidator.validateLogin), authController.login);
router.get("/profile", authMiddleware, authController.getProfile);
router.put("/profile", authMiddleware, validateDto(SchemaValidator.validateUpdateProfile), authController.updateProfile);

export default router;
