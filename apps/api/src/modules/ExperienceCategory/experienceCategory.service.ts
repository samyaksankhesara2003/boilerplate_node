import { log } from '@repo/logger';
import { ExperienceCategory } from '@repo/db';
import { IExperienceCategoryParams, IExperienceCategoryQuery } from './experienceCategory.types';

const getExperienceCategoryService = async (params: IExperienceCategoryParams): Promise<ExperienceCategory> => {
    try {
        const { experience_category_id } = params;
        const experienceCategoryAttributes = ['id', 'name', 'status'];

        const experienceCategory = await ExperienceCategory
            .query()
            .select(...experienceCategoryAttributes)
            .findById(experience_category_id);

        if (!experienceCategory) throw new Error('Experience Category not found');

        return experienceCategory;
    } catch (error) {
        log.error('getExperienceCategoryService Catch: ', error);
        throw error;
    }
};

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
    getExperienceCategoryService,
    listExperienceCategoriesService
};