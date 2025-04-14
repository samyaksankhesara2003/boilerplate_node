import { log } from '@repo/logger';
import { State } from '@repo/db';

const listStatesService = async (country_id: number): Promise<State []> => {
    try {
        const attributes = ['id', 'name'];
        const data = await State.query().where({ country_id }).select(...attributes).orderBy('name');
        return data;
    } catch (error) {
        log.error('listStatesService Catch: ', error);
        throw error;
    }
};

export const stateService = {
    listStatesService
};