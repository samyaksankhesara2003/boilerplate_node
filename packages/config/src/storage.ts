export const storageConfig = {
    s3BucketRegion: process.env.S3_BUCKET_REGION || 'us-east-1',
    s3BucketName: process.env.S3_BUCKET_NAME || 'test-bucket',
    s3BucketEndpoint: process.env.S3_BUCKET_ENDPOINT || 's3.amazonaws.com',
    s3BucketPort: Number(process.env.S3_BUCKET_PORT),
    s3BucketUseSSL: process.env.S3_BUCKET_USE_SSL === 'true' || false,
    s3BucketAccessKey: process.env.S3_BUCKET_ACCESS_KEY,
    s3BucketSecretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    s3BucketBaseUrl: process.env.S3_BUCKET_BASE_URL,
    s3BucketPrivate: process.env.S3_BUCKET_PRIVATE === 'true' || false,
    s3BucketPresignedUrlExpiry: Number(process.env.S3_BUCKET_PRESIGNED_URL_EXPIRY) || 3600,
};
