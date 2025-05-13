import { log } from '@repo/logger';
import { Country } from '@repo/db';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { ICountryParams, ICountryQuery } from './country.types';

/**
 * @author Jitendra Singh
 * @description Fetches a country by its ID.
 * @param {ICountryParams} params - The parameters containing the country ID.
 * @returns {Promise<Country>} A Promise that resolves to a Country object.
 */
const getCountryService = async (params: ICountryParams): Promise<Country> => {
    try {
        const { country_id } = params;

        const countryAttributes = ['id', 'name'];

        const country = await Country
            .query()
            .select(...countryAttributes)
            .findById(country_id);

        if (!country) throw new CustomError(ResponseMessages.COUNTRY.NOT_FOUND, StatusCodes.NOT_FOUND);

        return country;
    } catch (error) {
        log.error('getCountryService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all countries.
 * @param {ICountryQuery} query - The query containing search params.
 * @returns {Promise<Country[]>} A Promise that resolves to an array of Country objects.
 */
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