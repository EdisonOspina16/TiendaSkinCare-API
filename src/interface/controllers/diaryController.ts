import { Request, Response, NextFunction } from "express";
import { PrismaDiaryRepository } from "../../infrastructure/repositories/PrismaDiaryRepository";
import { CreateDiaryEntry } from "../../application/usecases/diary/CreateDiaryEntry";
import { UpdateDiaryEntry } from "../../application/usecases/diary/UpdateDiaryEntry";
import { DeleteDiaryEntry } from "../../application/usecases/diary/DeleteDiaryEntry";
import { GetDiaryEntries } from "../../application/usecases/diary/GetDiaryEntries";

const diaryRepository = new PrismaDiaryRepository();

const createDiaryEntry = new CreateDiaryEntry(diaryRepository);
const updateDiaryEntry = new UpdateDiaryEntry(diaryRepository);
const deleteDiaryEntry = new DeleteDiaryEntry(diaryRepository);
const getDiaryEntries = new GetDiaryEntries(diaryRepository);

export const diaryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const entries = await getDiaryEntries.execute(userId);
      res.status(200).json(entries);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const entry = await createDiaryEntry.execute(userId, req.body);
      res.status(201).json(entry);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const entry = await updateDiaryEntry.execute(req.params.id, userId, req.body);
      res.status(200).json(entry);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await deleteDiaryEntry.execute(req.params.id, userId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
