import { User } from '@repo/db';
import { log } from '@repo/logger';
import { constants } from '@repo/config';
import { comparePassword, hashPassword } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { IUser, IGetProfileResponse, IUpdateProfileBody, IChangePasswordBody } from './helpers/profile.types';

/**
 * @author Jitendra Singh
 * @description Retrieves the profile information for the given user.
 */
const getProfileService = async (user: IUser): Promise<IGetProfileResponse> => {
    try {
        const { id } = user;
        const userAttributes = ['id', 'first_name', 'last_name', 'email', 'profile_url', 'role', 'status'];
        const userDetails = await User.query().select(...userAttributes).findById(id);

        if (!userDetails || userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        if (+userDetails.status !== constants.userStatus['Active']) {
            throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);
        }

        return userDetails;
    } catch (error) {
        log.error('getProfileService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the profile information for the given user.
 */
const updateProfileService = async (user: IUser, body: IUpdateProfileBody): Promise<void> => {
    try {
        const { id } = user;
        const { first_name, last_name } = body;
        const userDetails = await User.query().findById(id);

        if (!userDetails || userDetails.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        if (+userDetails.status !== constants.userStatus['Active']) {
            throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);
        }

        await userDetails.$query().patch({ first_name, last_name });

        return;
    } catch (error) {
        log.error('updateProfileService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Changes the password for the given user.
 */
const changePasswordService = async (user: IUser, body: IChangePasswordBody): Promise<void> => {
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
        if (userDetails.password === new_password) {
            throw new CustomError(ResponseMessages.PASSWORD.PASSWORD_CANNOT_BE_SAME_AS_CURRENT, StatusCodes.BAD_REQUEST);
        }

        await userDetails.$query().patch({ password: new_password });

        return;
    } catch (error) {
        log.error('changePasswordService Catch: ', error);
        throw error;
    }
};

export const profileService = {
    getProfileService,
    updateProfileService,
    changePasswordService
};