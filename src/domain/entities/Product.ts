export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly category: string,
    public readonly imageUrl: string,
    public readonly showInDiary: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
