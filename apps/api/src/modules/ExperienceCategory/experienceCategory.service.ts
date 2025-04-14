import { log } from '@repo/logger';
import { ExperienceCategory } from '@repo/db';

const listExperienceCategoriesService = async (): Promise<ExperienceCategory []> => {
    try {
        const attributes = ['id', 'name', 'status'];
        const data = await ExperienceCategory.query().select(...attributes);
        return data;
    } catch (error) {
        log.error('listExperienceCategoriesService Catch: ', error);
        throw error;
    }
};

export const experienceCategoryService = {
    listExperienceCategoriesService
};