import { log } from '@repo/logger';
import path from 'path';
import { storageConfig } from '@repo/config';
import { uploadFile, downloadFile, s3Client } from '@repo/storage-service';
import { CustomError } from '@repo/response-handler';

const uploadMenu = async (file: Express.Multer.File) => {
    try {
        const objectKey = `casa_santiago/restaurant_menus/${file.originalname}`;
        const [uploadResult] = await Promise.allSettled([uploadFile(s3Client, storageConfig.s3BucketName, objectKey, file.buffer)]);

        if (uploadResult.status === 'rejected') {
            throw new CustomError(`Failed to upload file to S3: ${uploadResult.reason}`);
        }

        if (uploadResult.status === 'fulfilled') {
            const pdfBuffer = await downloadFile(s3Client, storageConfig.s3BucketName, objectKey);
        }
        return {
            objectKey,
            url: `${storageConfig.s3BucketEndpoint}/${storageConfig.s3BucketName}/${objectKey}`
        };
        // log.info('uploadMenu Service: ', uploadResult);
    } catch (error) {
        log.error('uploadMenu Service Catch: ', error);
    }
};

export const restaurantMenuService = {
    uploadMenu
};
