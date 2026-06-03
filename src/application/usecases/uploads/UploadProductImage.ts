import { StorageService } from "../../../domain/services/StorageService";
import { UploadedFile } from "../../../domain/entities/UploadedFile";
import { ValidationError } from "../../../domain/errors/DomainError";

export class UploadProductImage {
  constructor(private readonly storageService: StorageService) {}

  async execute(file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }): Promise<UploadedFile> {
    if (!file || !file.buffer) {
      throw new ValidationError("No se proporcionó ningún archivo válido");
    }

    return this.storageService.upload(
      file.buffer,
      file.originalname,
      file.mimetype
    );
  }
}
