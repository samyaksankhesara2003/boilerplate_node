import { describe, it, expect } from "@jest/globals";
import { storageConfig } from "../storage";

describe("storageConfig", () => {
    it("loads storage environment variables", () => {
        expect(storageConfig.s3BucketRegion).toEqual(process.env.S3_BUCKET_REGION);
        expect(storageConfig.s3BucketName).toEqual(process.env.S3_BUCKET_NAME);
        expect(storageConfig.s3BucketEndpoint).toEqual(process.env.S3_BUCKET_ENDPOINT);
        expect(storageConfig.s3BucketPort).toEqual(Number(process.env.S3_BUCKET_PORT));
        expect(storageConfig.s3BucketUseSSL).toEqual(process.env.S3_BUCKET_USE_SSL === 'true' || false);
        expect(storageConfig.s3BucketAccessKey).toEqual(process.env.S3_BUCKET_ACCESS_KEY);
        expect(storageConfig.s3BucketSecretAccessKey).toEqual(process.env.S3_BUCKET_SECRET_ACCESS_KEY);
        expect(storageConfig.s3BucketBaseUrl).toEqual(process.env.S3_BUCKET_BASE_URL);
        expect(storageConfig.s3BucketPrivate).toEqual(process.env.S3_BUCKET_PRIVATE === 'true' || false);
        expect(storageConfig.s3BucketPresignedUrlExpiry).toEqual(Number(process.env.S3_BUCKET_PRESIGNED_URL_EXPIRY) || 3600);
    });
});
