import { UploadedFile } from "../entities/UploadedFile";

export interface StorageService {
  upload(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<UploadedFile>;
}
