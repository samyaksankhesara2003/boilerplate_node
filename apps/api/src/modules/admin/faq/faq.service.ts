import { FAQ } from '@repo/db';
import { log } from '@repo/logger';
import { createPagination, PaginationResponse } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { Query, Schema } from './helpers/faq.types';

const model = FAQ;
const commonAttributes = ['id', 'question', 'answer', 'status'];

/**
 * @author Jainam Shah
 * @description Fetches a row by its ID.
 */
const get = async (id: number, attributes: string[] = commonAttributes): Promise<FAQ> => {
    try {
        const row = await model
            .query()
            .select(...attributes)
            .findById(id);
        if (!row) throw new CustomError(ResponseMessages.COMMON.NOT_FOUND, StatusCodes.NOT_FOUND);

        return row;
    } catch (error) {
        log.error('get Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Lists all rows.
 */
const list = async (queryParams: Query): Promise<PaginationResponse> => {
    try {
        const { search, status, perPage, page, orderBy, orderDir } = queryParams;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const query = await model
            .query()
            .select(...commonAttributes)
            .where(modifyQuery => {
                if (search) {
                    modifyQuery.where(builder => {
                        builder.where('question', 'like', `%${search}%`).orWhere('answer', 'like', `%${search}%`);
                    });
                }
                if (status) modifyQuery.where('status', `${status}`);
            })
            .limit(perPage)
            .range(startRange, endRange)
            .orderBy(orderBy, orderDir);

        const rows = createPagination(query.total, page, perPage, query.results);
        return rows;
    } catch (error) {
        log.error('list Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Creates a new row.
 */
const create = async (data: Schema): Promise<FAQ> => {
    try {
        const row = await model.query().insert(data);
        return row;
    } catch (error) {
        log.error('create Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Updates a particular row by its ID.
 */
const update = async (id: number, data: Schema): Promise<void> => {
    try {
        const row = await get(id, ['id']);
        await model.query().patch(data).where('id', row.id);
        return;
    } catch (error) {
        log.error('update Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Deletes a particular row by its ID.
 */
const remove = async (id: number): Promise<void> => {
    try {
        const row = await get(id, ['id']);
        await model.query().deleteById(row.id);
        return;
    } catch (error) {
        log.error('remove Catch: ', error);
        throw error;
    }
};

export const faqService = {
    get,
    list,
    create,
    update,
    remove
};
