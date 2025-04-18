import { log } from '@repo/logger';
import { Country } from '@repo/db';
import { ICountryParams, ICountryQuery } from './country.types';

const getCountryService = async (params: ICountryParams): Promise<Country> => {
    try {
        const { country_id } = params;

        const countryAttributes = ['id', 'name'];

        const country = await Country
            .query()
            .select(...countryAttributes)
            .findById(country_id);

        if (!country) throw new Error('Country not found');

        return country;
    } catch (error) {
        log.error('getCountryService Catch: ', error);
        throw error;
    }
};

const listCountriesService = async (query: ICountryQuery): Promise<Country[]> => {
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
    getCountryService,
    listCountriesService
};