import { log } from '@repo/logger';
import { QueryBuilder, User } from '@repo/db';
import { constants } from '@repo/config';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { createPagination, PaginationResponse } from '@repo/utils';
import { IUserListingFilter, IUserUpdateBody } from './helpers/user.types';

const user_Attributes = ['id', 'first_name', 'last_name', 'profile_url', 'email', 'mobile_number', 'status', 'role'];

/**
 * @author Yagnesh Acharya
 * @description Fetch User by id
 */
const getUserByIdService = async (id: number): Promise<User> => {
    try {
        const user = await User.query().select(user_Attributes).findById(id).where('role', constants.role.User);
        if (!user) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        return user;
    } catch (error) {
        log.error('getUserByIdService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Fetch All Users
 */
const getAllUserService = async (query: IUserListingFilter): Promise<PaginationResponse> => {
    try {
        const { status, search, perPage, page, orderBy, orderDir } = query;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const users = await User.query()
            .select(...user_Attributes)
            .modify((qb: QueryBuilder<User>) => {
                if (status) {
                    qb.where('status', status);
                }
                if (search) {
                    qb.where(builder => {
                        builder
                            .where('first_name', 'like', `%${search}%`)
                            .orWhere('last_name', 'like', `%${search}%`)
                            .orWhere('email', 'like', `%${search}%`)
                            .orWhere('mobile_number', 'like', `%${search}%`);
                    });
                }
            })
            .orderBy(orderBy, orderDir)
            .range(startRange, endRange);

        const rows = createPagination(users.total, page, perPage, users.results);
        return rows;
    } catch (error) {
        log.error('getAllUserService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user
 */
const updateUserService = async (body: IUserUpdateBody): Promise<void> => {
    try {
        const { id, ...userBody } = body;
        const userAttributes = ['id', 'first_name', 'last_name', 'profile_url'];
        const userData = await User.query()
            .select(...userAttributes)
            .findById(id)
            .where('role', constants.role.User);
        if (!userData) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        await userData.$query().patch(userBody);
        return;
    } catch (error) {
        log.error('updateUserService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user status based on id , if active than inactive and vice versa
 */
const updateUserStatusService = async (id: number): Promise<void> => {
    try {
        const userData = await User.query().findById(id).where('role', constants.role.User);
        if (!userData) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        await userData
            .$query()
            .where('id', id)
            .patch({ status: +userData.status === constants.status.Active ? constants.status.Inactive : constants.status.Active });
        return;
    } catch (error) {
        log.error('updateUserStatusService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Delete user based on id
 */
const deleteUserService = async (id: number): Promise<void> => {
    try {
        const user = await User.query().findById(id).where('role', constants.role.User);
        if (!user) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        await user.$query().where('id', id).patch({ deleted_at: new Date() });
        return;
    } catch (error) {
        log.error('deleteUserService Catch: ', error);
        throw error;
    }
};

export const userService = { getAllUserService, deleteUserService, updateUserStatusService, updateUserService, getUserByIdService };
