import { log } from '@repo/logger';
import { ExperienceSchedule } from '@repo/db';
import { IExperienceScheduleParams } from './experienceSchedule.types';

const listExperienceScheduleService = async (params: IExperienceScheduleParams): Promise<ExperienceSchedule[]> => {
    try {
        const { experience_id } = params;
        const experienceScheduleAttributes = ['id', 'experience_id', 'available_date', 'available_time', 'min_guests', 'max_guests', 'status'];

        const experienceSchedule = await ExperienceSchedule
            .query()
            .select(...experienceScheduleAttributes)
            .where({ experience_id });

        return experienceSchedule;
    } catch (error) {
        log.error('listExperienceScheduleService Catch: ', error);
        throw error;
    }
};

export const experienceScheduleService = {
    listExperienceScheduleService
};