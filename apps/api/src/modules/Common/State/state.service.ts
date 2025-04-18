import { log } from '@repo/logger';
import { State } from '@repo/db';
import { IGetStateParams, IStateParams, IStateQuery } from './state.types';

const getStateService = async (params: IGetStateParams): Promise<State> => {
    try {
        const { state_id } = params;

        const stateAttributes = ['id', 'name'];

        const state = await State.query().select(...stateAttributes).findById(state_id);

        if (!state) throw new Error('State not found');

        return state;
    } catch (error) {
        log.error('getStateService Catch: ', error);
        throw error;
    }
};

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
    getStateService,
    listStatesService
};