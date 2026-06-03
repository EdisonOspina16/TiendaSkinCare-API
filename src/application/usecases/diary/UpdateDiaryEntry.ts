import { DiaryRepository } from "../../../domain/repositories/DiaryRepository";
import { DiaryEntry } from "../../../domain/entities/DiaryEntry";
import { NotFoundError, ForbiddenError } from "../../../domain/errors/DomainError";

export class UpdateDiaryEntry {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async execute(
    id: string,
    userId: string,
    data: Partial<{
      title: string;
      content: string;
      date: Date;
      rating: number;
    }>
  ): Promise<DiaryEntry> {
    const existing = await this.diaryRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Entrada de diario no encontrada");
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError("No tiene permiso para modificar esta entrada");
    }

    if (data.date) {
      data.date = new Date(data.date);
    }

    return this.diaryRepository.update(id, userId, data);
  }
}
