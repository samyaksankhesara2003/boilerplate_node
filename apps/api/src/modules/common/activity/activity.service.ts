import { ActivityLog } from '@repo/db';
import { log } from '@repo/logger';
import { constants } from '@repo/config';
import { IActivityLog, IActivityLogQuery } from './helpers/activity.types';

/**
 * @author Jitendra Singh
 * @description Lists all activity logs.
 */
const listActivityLogsService = async (query: IActivityLogQuery): Promise<ActivityLog[]> => {
    try {
        const { user_id, from_date, to_date } = query;

        const activityLogAttributes = ['id', 'user_id', 'activity_id', 'ip_address', 'device_type', 'activity_type', 'created_at'];

        const activityLogQuery = ActivityLog.query().select(...activityLogAttributes);

        if (user_id) activityLogQuery.where('user_id', user_id);
        if (from_date) activityLogQuery.where('created_at', '>=', from_date);
        if (to_date) activityLogQuery.where('created_at', '<=', to_date);

        const activityLogs = await activityLogQuery;

        return activityLogs;
    } catch (error) {
        log.error('listActivityLogsService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Logs an activity by inserting a new record into the Activity Log table.
 */
const createActivityLogService = async (body: IActivityLog): Promise<void> => {
    try {
        const { user_id, activity_id, ip_address, device_type, activity_type } = body;

        await ActivityLog
            .query()
            .insert({
                user_id,
                activity_id: activity_id,
                ip_address: ip_address,
                device_type: device_type || constants.deviceType['DESKTOP'],
                activity_type: activity_type
            });

        return;
    } catch (error) {
        log.error('createActivityLogService Catch: ', error);
        throw error;
    }
};

export const activityLogService = {
    listActivityLogsService,
    createActivityLogService
};