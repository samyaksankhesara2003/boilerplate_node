import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants } from '@repo/config';
import { hashPassword } from '@repo/utils';
import { sendMail, SUBJECTS, TEMPLATES } from '@repo/mailer';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { ISocialSignInBody, ISocialSignInResponse } from './helpers/auth.types';
import { activityLogService } from '../../common/activity/activity.service';

/**
 * @author Jitendra Singh
 * @description Authenticates a user via social media (Google, Facebook, Apple), email and password, or phone.
 * @returns {Promise<ISocialSignInResponse>} - The user's token and login details.
 */
const socialSignInService = async (body: ISocialSignInBody): Promise<ISocialSignInResponse> => {
    const trx = await User.startTransaction();
    try {
        const { social_id, first_name, last_name, email, mobile_number, password, profile_url, auth_type, device_type } = body;

        const userAttributes = ['id', 'social_id', 'first_name', 'last_name', 'email', 'mobile_number', 'auth_type', 'role', 'status', 'deleted_at'];

        const userDetails = await User.query().select(...userAttributes).where({ social_id: social_id }).first();

        if (!userDetails) {

            const user = await User.query(trx).insert({
                social_id: social_id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile_number: mobile_number,
                password: password ? await hashPassword(password) : undefined,
                profile_url: profile_url,
                auth_type: auth_type,
                role: constants.role['User'],
                status: constants.userStatus['Active'],
            });

            const data = {
                id: user.id,
                name: user.first_name + ' ' + user?.last_name || '',
                email: user.email,
                mobile_number: user.mobile_number,
                role: user.role,
                status: user.status
            }

            const token = jwtUtil.signJwt(data);
            await user.$query(trx).patch({ token });

            await activityLogService.createActivityLogService({
                user_id: user.id,
                device_type: device_type || constants.deviceType['DESKTOP'],
                activity_type: constants.activityType['LOGIN'],
            });

            await trx.commit();

            sendMail(user.email, SUBJECTS.WELCOME, TEMPLATES.WELCOME, { name: user.first_name + ' ' + user.last_name });

            return { token, loginDetails: data };
        }

        if (userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.BAD_REQUEST);
        if (+userDetails.status !== constants.userStatus['Active']) throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);

        const data = {
            id: userDetails.id,
            name: userDetails.first_name + ' ' + userDetails?.last_name || '',
            email: userDetails.email,
            mobile_number: userDetails.mobile_number,
            role: userDetails.role,
            status: userDetails.status
        }

        const token = jwtUtil.signJwt(data);
        await userDetails.$query(trx).patch({ token: token });

        const loginDetails = {
            id: userDetails.id,
            name: userDetails.first_name + ' ' + userDetails?.last_name || '',
            email: userDetails.email,
            mobile_number: userDetails.mobile_number,
            role: userDetails.role,
            status: userDetails.status
        };

        await activityLogService.createActivityLogService({
            user_id: userDetails.id,
            device_type: device_type || constants.deviceType['DESKTOP'],
            activity_type: constants.activityType['LOGIN'],
        });

        await trx.commit();

        return { token, loginDetails };
    } catch (error) {
        await trx.rollback();
        log.error('socialSignInService Catch: ', error);
        throw error;
    }
};

export const authService = {
    socialSignInService
};