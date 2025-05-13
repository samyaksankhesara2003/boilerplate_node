import { log } from '@repo/logger';
import { State } from '@repo/db';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { IGetStateParams, IStateQuery } from './helpers/state.types';

/**
 * @author Jitendra Singh
 * @description Fetches a state by its ID.
 */
const getStateService = async (params: IGetStateParams): Promise<State> => {
    try {
        const { state_id } = params;

        const stateAttributes = ['id', 'name'];
        const state = await State.query().select(...stateAttributes).findById(state_id);
        if (!state) throw new CustomError(ResponseMessages.STATE.NOT_FOUND, StatusCodes.NOT_FOUND);

        return state;
    } catch (error) {
        log.error('getStateService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all states for a given country ID.
 */
const listStatesService = async (query: IStateQuery): Promise<State[]> => {
    try {
        const { country_id, search } = query;

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