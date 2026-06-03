import { DiaryEntry } from "../../domain/entities/DiaryEntry";
import { DiaryRepository } from "../../domain/repositories/DiaryRepository";
import { prisma } from "../prisma/prisma-client";
import { DiaryEntry as PrismaDiaryEntry } from "@prisma/client";

export class PrismaDiaryRepository implements DiaryRepository {
  private mapToEntity(d: PrismaDiaryEntry): DiaryEntry {
    return new DiaryEntry(
      d.id,
      d.userId,
      d.title,
      d.content,
      d.date,
      d.rating,
      d.createdAt,
      d.updatedAt
    );
  }

  async create(
    userId: string,
    title: string,
    content: string,
    date: Date,
    rating: number
  ): Promise<DiaryEntry> {
    const created = await prisma.diaryEntry.create({
      data: {
        userId,
        title,
        content,
        date,
        rating
      }
    });
    return this.mapToEntity(created);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<Omit<DiaryEntry, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<DiaryEntry> {
    const updated = await prisma.diaryEntry.update({
      where: { id, userId },
      data: {
        title: data.title,
        content: data.content,
        date: data.date,
        rating: data.rating
      }
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    try {
      await prisma.diaryEntry.delete({
        where: { id, userId }
      });
      return true;
    } catch {
      return false;
    }
  }

  async findByUserId(userId: string): Promise<DiaryEntry[]> {
    const entries = await prisma.diaryEntry.findMany({
      where: { userId },
      orderBy: { date: "desc" }
    });
    return entries.map((d) => this.mapToEntity(d));
  }

  async findById(id: string): Promise<DiaryEntry | null> {
    const d = await prisma.diaryEntry.findUnique({ where: { id } });
    return d ? this.mapToEntity(d) : null;
  }
}
