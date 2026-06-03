import { DiaryRepository } from "../../../domain/repositories/DiaryRepository";
import { NotFoundError, ForbiddenError } from "../../../domain/errors/DomainError";

export class DeleteDiaryEntry {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async execute(id: string, userId: string): Promise<boolean> {
    const existing = await this.diaryRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Entrada de diario no encontrada");
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError("No tiene permiso para eliminar esta entrada");
    }

    return this.diaryRepository.delete(id, userId);
  }
}
