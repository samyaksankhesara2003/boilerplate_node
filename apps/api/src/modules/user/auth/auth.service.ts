import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants } from '@repo/config';
import { sendMail, TEMPLATES } from '@repo/mailer';
import { comparePassword, hashPassword } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { ISignUpBody, ILoginBody, ISignUpResponse, ILoginResponse } from './helpers/auth.types';

/**
 * @author Jitendra Singh
 * @description Creates a new user in the database and sends a welcome email to the user.
 */
const signUpService = async (body: ISignUpBody): Promise<ISignUpResponse> => {
    const trx = await User.startTransaction();
    try {
        const { first_name, last_name, email, password } = body;

        const userAttributes = ['id', 'email'];
        const userDetails = await User.query().select(...userAttributes).where({ email: email }).first();
        if (userDetails) throw new CustomError(ResponseMessages.USER.ALREADY_EXISTS, StatusCodes.CONFLICT);

        const user = await User.query(trx).insert({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: await hashPassword(password),
            role: constants.role['User'],
            status: constants.userStatus['Active'],
        });

        const data = {
            id: user.id,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            role: user.role,
            status: user.status
        }

        const token = jwtUtil.signJwt(data);
        await user.$query(trx).patch({ token });

        await trx.commit();
        sendMail(user.email, 'Welcome!', TEMPLATES.WELCOME, { name: user.first_name + ' ' + user.last_name });

        return { token, loginDetails: data };
    } catch (error) {
        await trx.rollback();
        log.error('signUpService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Logs in a user if the credentials are valid and returns a token and login details.
 */
const loginService = async (body: ILoginBody): Promise<ILoginResponse> => {
    try {
        const { email, password } = body;

        const user = await User.query().where({ email: email }).first();
        if (!user || user.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.BAD_REQUEST);
        if (+user.status !== constants.userStatus['Active']) throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new CustomError(ResponseMessages.PASSWORD.INVALID_PASSWORD, StatusCodes.UNAUTHORIZED);

        const data = {
            id: user.id,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            role: user.role,
            status: user.status
        }

        const token = jwtUtil.signJwt(data);
        await user.$query().patch({ token: token });

        const loginDetails = {
            id: user.id,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            role: user.role,
            status: user.status
        };

        return { token, loginDetails };
    } catch (error) {
        log.error('loginService Catch: ', error);
        throw error;
    }
};

export const authService = {
    signUpService,
    loginService
};