import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { StorageService } from "../../domain/services/StorageService";
import { UploadedFile } from "../../domain/entities/UploadedFile";
import { storageConfig } from "../config/storage";

export class SupabaseStorageService implements StorageService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: storageConfig.endpoint,
      region: storageConfig.region,
      credentials: {
        accessKeyId: storageConfig.accessKeyId,
        secretAccessKey: storageConfig.secretAccessKey
      },
      forcePathStyle: true
    });
  }

  async upload(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<UploadedFile> {
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniqueName = `${Date.now()}-${cleanFileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: storageConfig.bucketName,
        Key: uniqueName,
        Body: fileBuffer,
        ContentType: mimeType
      })
    );

    // Construct public URL
    const url = `${storageConfig.publicUrl}/${storageConfig.bucketName}/${uniqueName}`;

    return new UploadedFile(url, uniqueName, mimeType, fileBuffer.length);
  }
}
