import { env } from "./env";

export const storageConfig = {
  endpoint: env.s3.endpoint,
  accessKeyId: env.s3.accessKeyId,
  secretAccessKey: env.s3.secretAccessKey,
  region: env.s3.region,
  bucketName: env.s3.bucketName,
  publicUrl: env.s3.publicUrl
};
