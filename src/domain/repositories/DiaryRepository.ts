import { DiaryEntry } from "../entities/DiaryEntry";

export interface DiaryRepository {
  create(
    userId: string,
    title: string,
    content: string,
    date: Date,
    rating: number
  ): Promise<DiaryEntry>;
  update(
    id: string,
    userId: string,
    data: Partial<Omit<DiaryEntry, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<DiaryEntry>;
  delete(id: string, userId: string): Promise<boolean>;
  findByUserId(userId: string): Promise<DiaryEntry[]>;
  findById(id: string): Promise<DiaryEntry | null>;
}
