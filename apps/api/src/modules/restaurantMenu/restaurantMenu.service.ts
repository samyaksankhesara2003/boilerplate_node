import crypto from 'node:crypto';
import OpenAI from 'openai';
import { log } from '@repo/logger';
import { storageConfig, openaiConfig, pineconeConfig } from '@repo/config';
import { uploadFile, downloadFile, s3Client } from '@repo/storage-service';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { RestaurantMenuItem } from '@repo/db';
import { convertPdfToImages } from './helpers/pdfHelper.js';
import { MENU_EXTRACTION_PROMPT, MENU_ITEMS_SCHEMA } from './helpers/menuPrompts.js';
import { CreateMenuItemBody, DeleteMenuItemQuery, getMenuItemsQuery, MenuItem, PineconeConfig, UpdateMenuItemBody } from './helpers/reataurant.types.js';
import { Pinecone } from '@pinecone-database/pinecone';

const openaiClient = new OpenAI({ apiKey: openaiConfig.apiKey });
const pinecone = new Pinecone({ apiKey: pineconeConfig.apiKey });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retries a Pinecone operation on transient connection failures (PineconeConnectionError),
 * which are caused by network blips or brief Pinecone outages rather than bad input.
 * Uses exponential backoff. Non-connection errors are re-thrown immediately.
 */
const withPineconeRetry = async <T>(operation: () => Promise<T>, retries = 3, baseDelayMs = 300): Promise<T> => {
    for (let attempt = 0; ; attempt++) {
        try {
            return await operation();
        } catch (error) {
            const isConnectionError = error instanceof Error && error.name === 'PineconeConnectionError';

            if (!isConnectionError || attempt >= retries) {
                throw error;
            }

            const delay = baseDelayMs * 2 ** attempt;
            log.warn(`Pinecone connection failed (attempt ${attempt + 1}/${retries}), retrying in ${delay}ms`);
            await sleep(delay);
        }
    }
};
// const uploadMenuAndImageConvert = async (file: Express.Multer.File) => {
//     try {
//         const objectKey = `casa_santiago/restaurant_menus/${file.originalname}`;

//         const [uploadResult] = await Promise.allSettled([uploadFile(s3Client, storageConfig.s3BucketName, objectKey, file.buffer)]);

//         if (uploadResult.status === 'rejected') {
//             throw new CustomError(`Failed to upload file to S3: ${uploadResult.reason}`);
//         }

//         const s3Response = await downloadFile(s3Client, storageConfig.s3BucketName, objectKey);
//         // s3Response.Body is stream data we need to convert it to buffer

//         const bytes = await s3Response.Body?.transformToByteArray();

//         if (!bytes) {
//             throw new CustomError('Failed to read downloaded file from S3');
//         }
//         const pdfBuffer = Buffer.from(bytes);

//         // if we are using the convert to image flow
//         const images = await convertPdfToImages(pdfBuffer);

//         return {
//             objectKey,
//             url: `${storageConfig.s3BucketEndpoint}/${storageConfig.s3BucketName}/${objectKey}`,
//             pageCount: images.length,
//             images
//         };
//     } catch (error) {
//         log.error('uploadMenu Service Catch: ', error);
//         throw error;
//     }
// };

const buildUniqueMenuId = (restaurantId: number, dishName: string, category: string | null) =>
    crypto
        .createHash('sha256')
        .update(`${restaurantId}|${dishName.trim().toLowerCase()}|${(category ?? '').trim().toLowerCase()}`)
        .digest('hex');

const buildMasterText = (item: MenuItem): string => {
    const lines: string[] = [`Dish: ${item.dish_name}`];

    if (item.category?.trim()) lines.push(`Category: ${item.category}`);
    if (item.dish_type?.trim()) lines.push(`Type: ${item.dish_type}`);
    if (item.description?.trim()) lines.push(`Description: ${item.description}`);
    if (item.ingredients?.length) lines.push(`Ingredients: ${item.ingredients.join(', ')}`);

    return lines.join('\n');
};

const storeMenuItems = async (items: MenuItem[]) => {
    const restaurantId = 1;

    const rows = items.map(item => ({
        restaurant_id: restaurantId,
        unique_menu_id: buildUniqueMenuId(restaurantId, item.dish_name, item.category),
        dish_name: item.dish_name,
        description: item.description,
        category: item.category,
        dish_type: item.dish_type,
        ingredients: item.ingredients,
        allergens: item.allergens,
        price: item.price,
        text: buildMasterText(item)
    }));

    return Promise.all(
        rows.map(row =>
            RestaurantMenuItem.query()
                .insert(row)
                .onConflict('unique_menu_id')
                .merge(['dish_name', 'description', 'category', 'dish_type', 'ingredients', 'allergens', 'price', 'text'])
        )
    );
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

        await storeMenuItems(items);

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

// Pinecone metadata cannot contain null/undefined values, so we drop empty fields.
const buildPineconeMetadata = (item: Pick<RestaurantMenuItem, 'dish_name' | 'description' | 'dish_type' | 'ingredients' | 'allergens' | 'price'>) => {
    const metadata: Record<string, string | number | string[]> = {
        dish_name: item.dish_name
    };

    if (item.description?.trim()) metadata.description = item.description;
    if (item.dish_type?.trim()) metadata.dish_type = item.dish_type;
    if (Array.isArray(item.ingredients) && item.ingredients.length) metadata.ingredients = item.ingredients;
    if (Array.isArray(item.allergens) && item.allergens.length) metadata.allergens = item.allergens;
    if (typeof item.price === 'number') metadata.price = item.price;

    return metadata;
};

const EMBEDDING_BATCH_SIZE = 100;
const UPSERT_BATCH_SIZE = 100;

const uploadMenuToPinecone = async (body: PineconeConfig) => {
    try {
        const { restaurant_id, namespace, index = pineconeConfig.index } = body;

        // 1. Fetch all menu items for the restaurant.
        const items = await RestaurantMenuItem.query().where('restaurant_id', restaurant_id).whereNotNull('text');

        if (!items.length) {
            return { index, namespace, upsertedCount: 0, items: [] };
        }

        // 2 & 3. Read each item's master `text` and generate embeddings (batched).
        const vectors: { id: string; values: number[]; metadata: Record<string, string | number | string[]> }[] = [];

        for (let i = 0; i < items.length; i += EMBEDDING_BATCH_SIZE) {
            const batch = items.slice(i, i + EMBEDDING_BATCH_SIZE);

            const embeddingResponse = await openaiClient.embeddings.create({
                model: openaiConfig.embeddingModel,
                input: batch.map(item => item.text)
            });

            batch.forEach((item, idx) => {
                vectors.push({
                    id: item.unique_menu_id, // 4. unique_menu_id as the document ID
                    values: embeddingResponse.data[idx].embedding, // the embedding vector
                    metadata: buildPineconeMetadata(item) // the metadata
                });
            });
        }

        // 5. Upsert the vectors into the Pinecone index/namespace (batched).
        const pineconeNamespace = pinecone.index(index).namespace(namespace);

        for (let i = 0; i < vectors.length; i += UPSERT_BATCH_SIZE) {
            await pineconeNamespace.upsert({ records: vectors.slice(i, i + UPSERT_BATCH_SIZE) });
        }

        return {
            index,
            namespace,
            upsertedCount: vectors.length,
            items: vectors.map(v => v.id)
        };
    } catch (error) {
        log.error('uploadMenuToPinecone Service Catch: ', error);
        throw error;
    }
};

const getMenuItems = async (query: getMenuItemsQuery) => {
    try {
        const { restaurant_id } = query;

        const items = await RestaurantMenuItem.query().where('restaurant_id', restaurant_id);

        return items;
    } catch (error) {
        log.error('getMenuItems Service Catch: ', error);
        throw error;
    }
};

const updateMenuItem = async (body: UpdateMenuItemBody) => {
    try {
        // The caller passes the current (old) unique_menu_id, which is the existing Pinecone vector ID.
        const {
            id,
            unique_menu_id: previousUniqueMenuId,
            dish_name,
            description,
            category,
            dish_type,
            ingredients,
            allergens,
            price,
            restaurant_id,
            namespace
        } = body;

        const item: MenuItem = { dish_name, description, category, dish_type, ingredients, allergens, price };

        // Regenerate the unique_menu_id and master text so they stay consistent with the updated data.
        const unique_menu_id = buildUniqueMenuId(restaurant_id, dish_name, category);
        const text = buildMasterText(item);

        // Make sure the row exists before touching Pinecone, so we don't sync a vector for a dish we can't update.
        const existing = await RestaurantMenuItem.query().findById(id);
        if (!existing) {
            throw new CustomError(ResponseMessages.MENU.NOT_FOUND, StatusCodes.NOT_FOUND);
        }

        // Embed the new text up front (used for the Pinecone upsert below).
        const embeddingResponse = await openaiClient.embeddings.create({
            model: openaiConfig.embeddingModel,
            input: [text]
        });

        const pineconeNamespace = pinecone.index(pineconeConfig.index).namespace(namespace);

        const metadata = buildPineconeMetadata({ dish_name, description, dish_type, ingredients, allergens, price });

        // Order matters for consistency on failure: upsert the new vector first (retried on transient
        // connection errors). Only once Pinecone has accepted the new data do we patch the DB, and only
        // then delete the old vector. If any step throws, we avoid the half-updated state where the DB
        // is patched but Pinecone is missing/stale.
        await withPineconeRetry(() =>
            pineconeNamespace.upsert({
                records: [
                    {
                        id: unique_menu_id,
                        values: embeddingResponse.data[0].embedding,
                        metadata
                    }
                ]
            })
        );

        const updated = await RestaurantMenuItem.query().patchAndFetchById(id, {
            restaurant_id,
            unique_menu_id,
            dish_name,
            description,
            category,
            dish_type,
            ingredients,
            allergens,
            price,
            text
        });

        // If dish_name/category changed, unique_menu_id changed too, so the old vector must be deleted
        // (Pinecone vector IDs are immutable — there is no rename).
        if (previousUniqueMenuId !== unique_menu_id) {
            await withPineconeRetry(() => pineconeNamespace.deleteOne({ id: previousUniqueMenuId }));
        }

        return updated;
    } catch (error) {
        log.error('updateMenuItem Service Catch: ', error);
        throw error;
    }
};

const createMenuItem = async (body: CreateMenuItemBody) => {
    try{
        const { restaurant_id, dish_name, description, category, dish_type, ingredients, allergens, price, namespace } = body;

        const unique_menu_id = buildUniqueMenuId(restaurant_id, dish_name, category);

        const existing = await RestaurantMenuItem.query().findOne({ unique_menu_id }).where('restaurant_id', restaurant_id);  

        if (existing) {
            throw new CustomError(ResponseMessages.MENU.ALREADY_EXISTS, StatusCodes.CONFLICT);
        }

        const text = buildMasterText({ dish_name, description, category, dish_type, ingredients, allergens, price });

        // Embed the new text up front (used for the Pinecone upsert below).
        const embeddingResponse = await openaiClient.embeddings.create({
            model: openaiConfig.embeddingModel,
            input: [text]
        });

        const pineconeNamespace = pinecone.index(pineconeConfig.index).namespace(namespace);

        const metadata = buildPineconeMetadata({ dish_name, description, dish_type, ingredients, allergens, price });

        await withPineconeRetry(() =>
            pineconeNamespace.upsert({
                records: [
                    {
                        id: unique_menu_id,
                        values: embeddingResponse.data[0].embedding,
                        metadata
                    }
                ]
            })
        );

        const createdItem = await RestaurantMenuItem.query().insert({
            restaurant_id,
            unique_menu_id,
            dish_name,
            description,
            category,
            dish_type,
            ingredients,
            allergens,
            price,
            text
        });

        return createdItem;

    }catch(error){
        log.error('createMenuItem Service Catch: ', error);
        throw error;
    }
}

const deleteMenuItem = async (query : DeleteMenuItemQuery) =>{
    try{
        const {id,namespace}  = query

        const menuItem  = await RestaurantMenuItem.query().findById(id)
        if(!menuItem){
            throw new CustomError(ResponseMessages.MENU.NOT_FOUND,StatusCodes.NOT_FOUND)
        }

        const pineconeNamespace = pinecone.index(pineconeConfig.index).namespace(namespace);
        await withPineconeRetry(() => pineconeNamespace.deleteOne({ id: menuItem.unique_menu_id }));

        await RestaurantMenuItem.query().deleteById(id)

        return true;
    }catch(error){
        log.error('createMenuItem Service Catch: ', error);
        throw error
    }
}

export const restaurantMenuService = {
    // uploadMenuAndImageConvert,
    uploadMenu,
    uploadMenuToPinecone,
    getMenuItems,
    updateMenuItem,
    createMenuItem,
    deleteMenuItem
};