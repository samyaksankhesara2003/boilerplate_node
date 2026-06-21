import OpenAI from 'openai';
import { log } from '@repo/logger';
import { storageConfig, openaiConfig } from '@repo/config';
import { uploadFile, downloadFile, s3Client } from '@repo/storage-service';
import { CustomError } from '@repo/response-handler';
import { convertPdfToImages } from './helpers/pdfHelper.js';
import { MENU_EXTRACTION_PROMPT, MENU_ITEMS_SCHEMA } from './helpers/menuPrompts.js';
import { MenuItem } from './helpers/reataurant.types.js';

const openaiClient = new OpenAI({ apiKey: openaiConfig.apiKey });

const uploadMenuAndImageConvert = async (file: Express.Multer.File) => {
    try {
        const objectKey = `casa_santiago/restaurant_menus/${file.originalname}`;

        const [uploadResult] = await Promise.allSettled([uploadFile(s3Client, storageConfig.s3BucketName, objectKey, file.buffer)]);

        if (uploadResult.status === 'rejected') {
            throw new CustomError(`Failed to upload file to S3: ${uploadResult.reason}`);
        }

        const s3Response = await downloadFile(s3Client, storageConfig.s3BucketName, objectKey);
        // s3Response.Body is stream data we need to convert it to buffer

        const bytes = await s3Response.Body?.transformToByteArray();

        if (!bytes) {
            throw new CustomError('Failed to read downloaded file from S3');
        }
        const pdfBuffer = Buffer.from(bytes);

        // if we are using the convert to image flow
        const images = await convertPdfToImages(pdfBuffer);

        return {
            objectKey,
            url: `${storageConfig.s3BucketEndpoint}/${storageConfig.s3BucketName}/${objectKey}`,
            pageCount: images.length,
            images
        };
    } catch (error) {
        log.error('uploadMenu Service Catch: ', error);
        throw error;
    }
};

const uploadMenu = async (file: Express.Multer.File) => {
    try {
        const objectKey = `casa_santiago/restaurant_menus/${file.originalname}`;

        const [uploadResult] = await Promise.allSettled([uploadFile(s3Client, storageConfig.s3BucketName, objectKey, file.buffer)]);

        if (uploadResult.status === 'rejected') {
            throw new CustomError(`Failed to upload file to S3: ${uploadResult.reason}`);
        }

        const s3Response = await downloadFile(s3Client, storageConfig.s3BucketName, objectKey);
        // s3Response.Body is stream data we need to convert it to buffer

        const bytes = await s3Response.Body?.transformToByteArray();

        if (!bytes) {
            throw new CustomError('Failed to read downloaded file from S3');
        }
        const pdfBuffer = Buffer.from(bytes);

        const pdfBase64 = pdfBuffer.toString('base64');

        const aiResponse = await openaiClient.responses.create({
            model: openaiConfig.model,
            temperature: 0,
            instructions: MENU_EXTRACTION_PROMPT,
            input: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'input_text',
                            text: 'Extract ALL menu items from this document. Only include dishes that actually appear; use null / [] for anything not stated.'
                        },
                        {
                            type: 'input_file',
                            filename: file.originalname,
                            file_data: `data:application/pdf;base64,${pdfBase64}`,
                            detail: 'high'
                        }
                    ]
                }
            ],
            text: {
                format: {
                    type: 'json_schema',
                    name: 'menu_extraction',
                    strict: true,
                    schema: MENU_ITEMS_SCHEMA
                }
            }
        });

        const raw = aiResponse.output_text; // helper that concatenates the text output
        if (!raw) {
            throw new Error('Menu extraction returned no content (possible refusal).');
        }
        const { items } = JSON.parse(raw) as { items: MenuItem[] };

        return {
            objectKey,
            url: `${storageConfig.s3BucketEndpoint}/${storageConfig.s3BucketName}/${objectKey}`,
            mediaType: 'application/pdf' as const,
            items
        };
    } catch (error) {
        log.error('uploadMenu Service Catch: ', error);
        throw error;
    }
};

export const restaurantMenuService = {
    uploadMenuAndImageConvert,
    uploadMenu
};
