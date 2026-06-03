import { Router } from "express";
import { diaryController } from "../../controllers/diaryController";
import { validateDto } from "../../middlewares/validateDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SchemaValidator } from "../../../infrastructure/validators/schema.validator";

const router = Router();

router.use(authMiddleware);

router.get("/", diaryController.getAll);
router.post("/", validateDto(SchemaValidator.validateDiaryEntry), diaryController.create);
router.put("/:id", validateDto(SchemaValidator.validateDiaryEntry), diaryController.update);
router.delete("/:id", diaryController.delete);

export default router;
