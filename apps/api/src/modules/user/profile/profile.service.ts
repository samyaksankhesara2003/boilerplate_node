import { User } from '@repo/db';
import { log } from '@repo/logger';
import { constants, storageConfig } from '@repo/config';
import { comparePassword, hashPassword } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { deleteFile, getPresignedUrl, s3Client, uploadFile } from '@repo/storage-service';
import { IUser, IGetProfileResponse, IUpdateProfileBody, IChangePasswordBody, ILogoutBody } from './helpers/profile.types';
import { activityLogService } from '../../common/activity/activity.service';

/**
 * @author Jitendra Singh
 * @description Retrieves the profile information for the given user.
 */
const getProfile = async (user: IUser): Promise<IGetProfileResponse> => {
    try {
        const { id } = user;
        const userAttributes = ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'profile_url', 'role', 'status'];

        const userDetails = await User.query()
            .select(...userAttributes)
            .findById(id);

        if (!userDetails || userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        if (+userDetails.status !== constants.userStatus['Active']) {
            throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);
        }

        if (userDetails.profile_url) userDetails.profile_url = await getPresignedUrl(storageConfig.s3BucketName, userDetails.profile_url);

        return userDetails;
    } catch (error) {
        log.error('getProfile Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the profile information for the given user.
 */
const updateProfile = async (user: IUser, body: IUpdateProfileBody, file: Express.Multer.File): Promise<void> => {
    try {
        const { id } = user;
        const { first_name, last_name } = body;

        const userDetails = await User.query().findById(id);

        if (!userDetails || userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        if (+userDetails.status !== constants.userStatus['Active']) {
            throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);
        }

        if (file && userDetails.profile_url) await deleteFile(s3Client, storageConfig.s3BucketName, userDetails.profile_url);

        const profile_url = `USER-${user.id}/PROFILE/${file.originalname}`;
        await uploadFile(s3Client, storageConfig.s3BucketName, profile_url, file.buffer);

        await userDetails.$query().patch({ first_name, last_name, profile_url });

        return;
    } catch (error) {
        log.error('updateProfile Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Changes the password for the given user.
 */
const changePassword = async (user: IUser, body: IChangePasswordBody): Promise<void> => {
    try {
        const { id } = user;
        const { current_password, new_password } = body;

        const userDetails = await User.query().findById(id);

        if (!userDetails || userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        if (+userDetails.status !== constants.userStatus['Active']) {
            throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);
        }

        const isPasswordValid = comparePassword(current_password, userDetails.password);
        if (!isPasswordValid) throw new CustomError(ResponseMessages.PASSWORD.INVALID_PASSWORD, StatusCodes.UNAUTHORIZED);

        userDetails.password = await hashPassword(new_password);
        if (userDetails.password === new_password)
            throw new CustomError(ResponseMessages.PASSWORD.PASSWORD_CANNOT_BE_SAME_AS_CURRENT, StatusCodes.BAD_REQUEST);

        await userDetails.$query().patch({ password: userDetails.password });

        return;
    } catch (error) {
        log.error('changePassword Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Logs out the given user.
 */
const logout = async (user: IUser, body: ILogoutBody): Promise<void> => {
    try {
        const { ip_address, device_type } = body;

        const userAttributes = ['id', 'social_id', 'first_name', 'last_name', 'email', 'mobile_number', 'token', 'auth_type', 'role', 'status'];

        const userDetails = await User.query()
            .select(...userAttributes)
            .findById(user.id);

        if (!userDetails) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);

        await userDetails.$query().patch({ token: null });

        await activityLogService.createActivityLog({
            user_id: user.id,
            ip_address: ip_address,
            device_type: device_type || constants.deviceType['DESKTOP'],
            activity_type: constants.activityType['LOGOUT']
        });

        return;
    } catch (error) {
        log.error('logout Catch: ', error);
        throw error;
    }
};

export const profileService = {
    getProfile,
    updateProfile,
    changePassword,
    logout
};
