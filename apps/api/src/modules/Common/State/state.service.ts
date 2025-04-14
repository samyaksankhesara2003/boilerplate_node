import { log } from '@repo/logger';
import { State } from '@repo/db';
import { IStateParams, IStateQuery } from './state.types';

const listStatesService = async (params: IStateParams, query: IStateQuery): Promise<State []> => {
    try {
        const { country_id } = params;
        const {search} = query;

        const stateAttributes = ['id', 'name'];

        const stateQuery = State.query().where({ country_id }).select(...stateAttributes);

        if (search) stateQuery.where('name', 'like', `%${search}%`);

        const states = await stateQuery;

        return states;
    } catch (error) {
        log.error('listStatesService Catch: ', error);
        throw error;
    }
};

export const stateService = {
    listStatesService
};