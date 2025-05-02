import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommandOutput,
    GetObjectCommandOutput,
    DeleteObjectCommandOutput,
    DeleteObjectsCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { log } from '@repo/logger';
import { storageConfig } from '@repo/config';

// Create an S3 client instance to pass explicitly
const s3Client = new S3Client({
    region: storageConfig.s3BucketRegion,
    endpoint: storageConfig.s3BucketEndpoint,
    credentials: {
        accessKeyId: storageConfig.s3BucketAccessKeyId!,
        secretAccessKey: storageConfig.s3BucketSecretAccessKey!,
    },
});

/**
 * @description Upload a single file to S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to upload to.
 * @param {string} key - The key of the file to upload.
 * @param {Buffer | string | ReadableStream | Blob} body - The body of the file to upload.
 * @returns {Promise<PutObjectCommandOutput>} The result of the PutObjectCommand.
 */
const uploadFile = async (
    s3Client: S3Client,
    bucketName: string,
    key: string,
    body: Buffer | string | ReadableStream | Blob
): Promise<PutObjectCommandOutput> => {
    try {
        const result = await s3Client.send(new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body }));
        return result;
    } catch (error) {
        log.error(`Error uploading file to S3: ${error}`);
        throw new Error(`Failed to upload file to ${bucketName}/${key}`);
    }
};

/**
 * @description Upload multiple files to S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to upload to.
 * @param {{ key: string, body: Buffer | string | ReadableStream | Blob }[]} files - An array of objects containing the key and body of each file to upload.
 * @returns {Promise<PutObjectCommandOutput[]>} An array of the results of the PutObjectCommand for each file.
 */
const uploadMultipleFiles = async (
    s3Client: S3Client,
    bucketName: string,
    files: { key: string, body: Buffer | string | ReadableStream | Blob }[]
): Promise<PutObjectCommandOutput[]> => {
    try {
        const uploadPromises = files.map(file =>
            s3Client.send(new PutObjectCommand({ Bucket: bucketName, Key: file.key, Body: file.body }))
        );
        return await Promise.all(uploadPromises);
    } catch (error) {
        log.error(`Error uploading multiple files to S3: ${error}`);
        throw new Error(`Failed to upload multiple files to ${bucketName}`);
    }
};

/**
 * @description Download a single file from S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to download from.
 * @param {string} key - The key of the file to download.
 * @returns {Promise<GetObjectCommandOutput>} The result of the GetObjectCommand.
 */
const downloadFile = async (
    s3Client: S3Client,
    bucketName: string,
    key: string
): Promise<GetObjectCommandOutput> => {
    try {
        return await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
    } catch (error) {
        log.error(`Error downloading file from S3: ${error}`);
        throw new Error(`Failed to download file from ${bucketName}/${key}`);
    }
};

/**
 * @description Download multiple files from S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to download from.
 * @param {string[]} keys - An array of keys of the files to download.
 * @returns {Promise<GetObjectCommandOutput[]>} An array of the results of the GetObjectCommand for each file.
 */
const downloadMultipleFiles = async (
    s3Client: S3Client,
    bucketName: string,
    keys: string[]
): Promise<GetObjectCommandOutput[]> => {
    try {
        const downloadPromises = keys.map(key =>
            s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }))
        );
        return await Promise.all(downloadPromises);
    } catch (error) {
        log.error(`Error downloading multiple files from S3: ${error}`);
        throw new Error(`Failed to download multiple files from ${bucketName}`);
    }
};

/**
 * @description Delete a single file from S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to delete from.
 * @param {string} key - The key of the file to delete.
 * @returns {Promise<DeleteObjectCommandOutput>} The result of the DeleteObjectCommand.
 */
const deleteFile = async (
    s3Client: S3Client,
    bucketName: string,
    key: string
): Promise<DeleteObjectCommandOutput> => {
    try {
        return await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
    } catch (error) {
        log.error(`Error deleting file from S3: ${error}`);
        throw new Error(`Failed to delete file from ${bucketName}/${key}`);
    }
};

/**
 * @description Delete multiple files from S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to delete from.
 * @param {string[]} keys - An array of keys of the files to delete.
 * @returns {Promise<DeleteObjectsCommandOutput>} The result of the DeleteObjectsCommand.
 */
const deleteMultipleFiles = async (
    s3Client: S3Client,
    bucketName: string,
    keys: string[]
): Promise<DeleteObjectsCommandOutput> => {
    try {
        const objectsToDelete = keys.map(key => ({ Key: key }));
        return await s3Client.send(new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: { Objects: objectsToDelete },
        }));
    } catch (error) {
        log.error(`Error deleting multiple files from S3: ${error}`);
        throw new Error(`Failed to delete multiple files from ${bucketName}`);
    }
};

/**
 * @description Deletes a folder and its contents from S3.
 * @param {S3Client} s3Client - An instance of the S3 client.
 * @param {string} bucketName - The name of the S3 bucket to delete from.
 * @param {string} prefix - The prefix of the folder to delete.
 * @returns {Promise<void>} A promise that resolves when the folder is deleted.
 */
const deleteFolder = async (
    s3Client: S3Client,
    bucketName: string,
    prefix: string
): Promise<void> => {
    try {
        const listedObjects = await s3Client.send(new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        }));

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            log.warn(`Folder ${prefix} is already empty.`);
            return;
        }

        await s3Client.send(new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
                Objects: listedObjects.Contents.map(content => ({ Key: content.Key! })),
            },
        }));

        log.info(`Folder ${prefix} and its contents deleted.`);
    } catch (error) {
        log.error(`Error deleting folder from S3: ${error}`);
        throw new Error(`Failed to delete folder ${prefix} from ${bucketName}`);
    }
};

/**
 * @description Generate a pre-signed URL for downloading a file from S3.
 * @param bucketName - The name of the S3 bucket.
 * @param key - The key (path) of the file.
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour).
 * @returns Promise that resolves to the pre-signed URL.
 */
const getPresignedUrl = async (
    bucketName: string,
    key: string,
    expiresIn: number = 3600
): Promise<string> => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn });
        return url;
    } catch (error) {
        log.error(`Error generating presigned URL for ${bucketName}/${key}: ${error}`);
        throw new Error(`Failed to generate presigned URL for ${key}`);
    }
};

export {
    s3Client,
    uploadFile,
    uploadMultipleFiles,
    downloadFile,
    downloadMultipleFiles,
    deleteFile,
    deleteMultipleFiles,
    deleteFolder,
    getPresignedUrl
};
