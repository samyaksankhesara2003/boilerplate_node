import { log } from '@repo/logger';
import { Country } from '@repo/db';

const listCountriesService = async (): Promise<Country []> => {
    try {
        const attributes = ['id', 'name'];
        const data = await Country.query().select(...attributes).orderBy('name');
        return data;
    } catch (error) {
        log.error('listCountriesService Catch: ', error);
        throw error;
    }
};

export const countryService = {
    listCountriesService
};