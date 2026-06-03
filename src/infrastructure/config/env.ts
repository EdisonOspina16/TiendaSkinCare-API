import dotenv from "dotenv";

dotenv.config();

// Ensure required environment variables are set
const requiredEnv = [
  "DATABASE_URL",
  "JWT_SECRET",
  "SUPABASE_S3_ENDPOINT",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_REGION",
  "S3_BUCKET_NAME",
  "SUPABASE_STORAGE_PUBLIC_URL"
];

for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

export const env = {
  port: parseInt(process.env.PORT || process.env.port || "4000", 10),
  databaseUrl: process.env.DATABASE_URL!,
  directUrl: process.env.DIRECT_URL,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  s3: {
    endpoint: process.env.SUPABASE_S3_ENDPOINT!,
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    region: process.env.S3_REGION!,
    bucketName: process.env.S3_BUCKET_NAME!,
    publicUrl: process.env.SUPABASE_STORAGE_PUBLIC_URL!
  },
  frontendUrl: process.env.FRONTEND_URL || "*"
};
