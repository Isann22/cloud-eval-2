import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "uncrypto";
import { s3Client, S3_BUCKET_NAME } from "../utils/s3";

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);

  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      data: { success: false, message: "No file uploaded" },
    });
  }

  const filePart = parts.find((p) => p.name === "file");

  if (!filePart || !filePart.data) {
    throw createError({
      statusCode: 400,
      data: { success: false, message: "No file uploaded" },
    });
  }

  // Derive extension from the original filename or content-type
  const originalName = filePart.filename ?? "upload";
  const ext = originalName.includes(".")
    ? originalName.split(".").pop()
    : "bin";
  const key = `${randomUUID()}.${ext}`;

  const region = process.env.AWS_REGION!;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: filePart.data,
      ContentType: filePart.type ?? "application/octet-stream",
    }),
  );

  const url = `https://${S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

  return { success: true, url };
});
