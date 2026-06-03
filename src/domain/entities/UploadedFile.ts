export class UploadedFile {
  constructor(
    public readonly url: string,
    public readonly name: string,
    public readonly mimeType: string,
    public readonly size: number
  ) {}
}
