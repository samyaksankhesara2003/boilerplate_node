import { log } from '@repo/logger';
import { ExperienceCategory } from '@repo/db';
import { IExperienceCategoryQuery } from './experienceCategory.types';

const listExperienceCategoriesService = async (query: IExperienceCategoryQuery): Promise<ExperienceCategory[]> => {
    try {
        const { search } = query;
        const experienceCategoryAttributes = ['id', 'name', 'status'];

        const experienceCategoryQuery = ExperienceCategory
            .query()
            .select(...experienceCategoryAttributes);

        if (search) experienceCategoryQuery.where('name', 'like', `%${search}%`);

        const experienceCategory = await experienceCategoryQuery;

        return experienceCategory;
    } catch (error) {
        log.error('listExperienceCategoriesService Catch: ', error);
        throw error;
    }
};

export const experienceCategoryService = {
    listExperienceCategoriesService
};