import { log } from '@repo/logger';
import { Experience } from '@repo/db';
import { IExperienceQuery } from './experience.types';

const listExperienceService = async (query: IExperienceQuery): Promise<Experience[]> => {
    try {
        const { experience_category_id, country_id } = query;

        const experienceAttributes = [
            'id', 'experience_category_id', 'country_id', 'title', 'description', 'duration',
            'banner_url', 'rating', 'review_count', 'features', 'duration_type', 'language', 'status'
        ];
        const countryAttributes = ['id', 'name'];
        const experienceCategoryAttributes = ['id', 'name', 'status'];
        const experiencePriceAttributes = ['id', 'experience_id', 'min_guests', 'max_guests', 'price', 'service_fee', 'price_type', 'currency'];
        const experienceScheduleAttributes = ['id', 'experience_id', 'available_date', 'available_time', 'min_guests', 'max_guests', 'status'];

        const experienceQuery = Experience
            .query()
            .select(...experienceAttributes)
            .withGraphFetched(`[
                country(selectCountry),
                experience_category(selectExperienceCategory),
                experience_price(selectExperiencePrice),
                experience_schedules(selectExperienceSchedule)
            ]`)
            .modifiers({
                selectCountry: builder => builder.select(...countryAttributes),
                selectExperienceCategory: builder => builder.select(...experienceCategoryAttributes),
                selectExperiencePrice: builder => builder.select(...experiencePriceAttributes),
                selectExperienceSchedule: builder => builder.select(...experienceScheduleAttributes)
            });

        if (experience_category_id) experienceQuery.where({ experience_category_id });
        if (country_id) experienceQuery.where({ country_id });

        const experiences = await experienceQuery;

        return experiences;
    } catch (error) {
        log.error('listExperienceService Catch: ', error);
        throw error;
    }
};

export const experienceService = {
    listExperienceService
};