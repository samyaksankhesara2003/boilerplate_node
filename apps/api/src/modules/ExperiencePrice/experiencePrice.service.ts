import { log } from '@repo/logger';
import { ExperiencePrice } from '@repo/db';
import { IExperiencePriceParams } from './experiencePrice.types';

const getExperiencePriceService = async (params: IExperiencePriceParams): Promise<ExperiencePrice[]> => {
    try {
        const { experience_id } = params;
        const experiencePriceAttributes = ['id', 'experience_id', 'min_guests', 'max_guests', 'price', 'service_fee', 'price_type', 'currency'];

        const experiencePrice = await ExperiencePrice
            .query()
            .select(...experiencePriceAttributes)
            .where({ experience_id });

        return experiencePrice;
    } catch (error) {
        log.error('getExperiencePriceService Catch: ', error);
        throw error;
    }
};

export const experiencePriceService = {
    getExperiencePriceService
};