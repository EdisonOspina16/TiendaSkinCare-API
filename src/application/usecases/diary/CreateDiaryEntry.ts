import { DiaryRepository } from "../../../domain/repositories/DiaryRepository";
import { DiaryEntry } from "../../../domain/entities/DiaryEntry";

export class CreateDiaryEntry {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async execute(
    userId: string,
    data: {
      title: string;
      content: string;
      date?: Date;
      rating?: number;
    }
  ): Promise<DiaryEntry> {
    const entryDate = data.date ? new Date(data.date) : new Date();
    const ratingValue = data.rating !== undefined ? data.rating : 5;
    return this.diaryRepository.create(
      userId,
      data.title,
      data.content,
      entryDate,
      ratingValue
    );
  }
}
