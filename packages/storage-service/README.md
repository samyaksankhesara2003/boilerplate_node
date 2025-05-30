x# @repo/storage-service

A wrapper service for AWS S3 that provides utility functions to handle common operations such as uploading, downloading, deleting files and folders, and generating presigned URLs.

---

## 📁 Folder Structure

```
📦 storage-service/
├── 📁 dist/                  # Compiled output
├── 📁 node_modules/          # Dependencies
├── 📁 src/                   # Source code
│   ├── 📁 __tests__/         # Unit tests
│   │   └── 📄 index.ts       # Test entry file
│   └── 📄 s3Service.ts       # S3 service logic
├── 📁 .turbo/                # Turbo repo metadata
├── 📄 eslint.config.js       # ESLint configuration
├── 📄 package.json           # NPM package metadata
├── 📄 README.md              # Project documentation
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 tsup.config.ts         # tsup bundler config
└── 📄 turbo.json             # Turborepo configuration

```

---

## ✨ Features

- Upload single or multiple files to S3
- Download single or multiple files from S3
- Delete single or multiple files or folders from S3
- Generate presigned URLs for secure file access

---

## Installation

1. Install the package in your project:

```bash
pnpm add @repo/storage-service@workspace:* --filter api ( package name )
```

---

## 📦 Environment Configuration

### Required environment varibles

```bash
S3_BUCKET_REGION
S3_BUCKET_NAME
S3_BUCKET_ENDPOINT
S3_BUCKET_PORT
S3_BUCKET_USE_SSL
S3_BUCKET_ACCESS_KEY
S3_BUCKET_SECRET_ACCESS_KEY
S3_BUCKET_BASE_URL
S3_BUCKET_PRESIGNED_URL_EXPIRY
```

#### ❗ NOTE : Make sure to add respective constants in @repo/config package

#### Example

```ts
file location : packages/config/src/storage.ts

export const storageConfig = {
    s3BucketRegion: process.env.S3_BUCKET_REGION!,
    s3BucketName: process.env.S3_BUCKET_NAME!,
    s3BucketEndpoint: process.env.S3_BUCKET_ENDPOINT!,
    s3BucketAccessKey: process.env.S3_BUCKET_ACCESS_KEY,
    s3BucketSecretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    s3BucketBaseUrl: process.env.S3_BUCKET_BASE_URL,
    s3BucketPresignedUrlExpiry: Number(process.env.S3_BUCKET_PRESIGNED_URL_EXPIRY) || 3600
};
```

---

## 🛠 Usage

```ts
import { s3Client, uploadFile, downloadFile, deleteFile, getPresignedUrl } from '@repo/storage-service';
import { storageConfig } from '@repo/config';

// Example of file url
const profile_url = `USER-${id}/USER/${file.originalname}`;

// Example: Upload a file
await uploadFile(s3Client, storageConfig.s3BucketName, profile_url, file.buffer);

// Example: Delete file from s3
await deleteFile(s3Client, storageConfig.s3BucketName, profile_url);

// Example: Get a presigned URL
const url = await getPresignedUrl('my-bucket', 'file.txt');
```
