import { log } from '@repo/logger';
import { User } from '@repo/db';
import { constants } from '@repo/config';

import { IUser, IGetProfileResponse, IUpdateProfileBody, IChangePasswordBody } from './profile.types';

const getProfileService = async (user: IUser): Promise<IGetProfileResponse> => {
    try {
        const { id } = user;

        const userAttributes = ['id', 'first_name', 'last_name', 'email', 'profile_url', 'role', 'status'];
        const userDetails = await User
            .query()
            .select(...userAttributes)
            .findById(id);

        if (!userDetails || userDetails.deleted_at) throw new Error('User not found');

        if (+userDetails.status !== constants.userStatus['Active']) throw new Error('User is not active');
           
        return userDetails;
    } catch (error) {
        log.error('getProfileService Catch: ', error);
        throw error;
    }
};

const updateProfileService = async (user: IUser, body: IUpdateProfileBody): Promise<void> => {
    try {
        const { id } = user;
        const { first_name, last_name } = body;

        const userDetails = await User
            .query()
            .findById(id);

        if (!userDetails || userDetails.deleted_at) throw new Error('User not found');

        if (+userDetails.status !== constants.userStatus['Active']) throw new Error('User is not active');

        await userDetails.$query().patch({ first_name, last_name });

        return;
    } catch (error) {
        log.error('updateProfileService Catch: ', error);
        throw error;
    }
};

const changePasswordService = async (user: IUser, body: IChangePasswordBody): Promise<void> => {
    try {
        const { id } = user;
        const { current_password, new_password } = body;

        const userDetails = await User
            .query()
            .findById(id);

        if (!userDetails || userDetails.deleted_at) throw new Error('User not found');

        if (+userDetails.status !== constants.userStatus['Active']) throw new Error('User is not active');

        
        // const isPasswordValid = passwordHelper.comparePassword(current_password, userDetails.password);
        const isPasswordValid = current_password === userDetails.password;
        if (!isPasswordValid) throw new Error('Invalid password');
        // userDetails.password = passwordHelper.encryptPassword(new_password);
        
        if (userDetails.password === new_password) throw new Error('New password cannot be same as current password');

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