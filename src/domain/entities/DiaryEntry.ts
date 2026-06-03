export class DiaryEntry {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly date: Date,
    public readonly rating: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
