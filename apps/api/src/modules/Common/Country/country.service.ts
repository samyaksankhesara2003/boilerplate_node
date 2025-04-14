import { log } from '@repo/logger';
import { Country } from '@repo/db';
import { ICountryQuery } from './country.types';

const listCountriesService = async (query: ICountryQuery): Promise<Country []> => {
    try {
        const { search } = query;
        
        const countryAttributes = ['id', 'name'];

        const countryQuery = Country.query().select(...countryAttributes);

        if (search) countryQuery.where('name', 'like', `%${search}%`);

        const countries = await countryQuery;

        return countries;
    } catch (error) {
        log.error('listCountriesService Catch: ', error);
        throw error;
    }
};

export const countryService = {
    listCountriesService
};