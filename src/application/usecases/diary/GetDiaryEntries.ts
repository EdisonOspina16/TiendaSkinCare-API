import { DiaryRepository } from "../../../domain/repositories/DiaryRepository";
import { DiaryEntry } from "../../../domain/entities/DiaryEntry";

export class GetDiaryEntries {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async execute(userId: string): Promise<DiaryEntry[]> {
    return this.diaryRepository.findByUserId(userId);
  }
}
