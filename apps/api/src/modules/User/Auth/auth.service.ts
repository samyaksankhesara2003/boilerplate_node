import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants } from '@repo/config';
import { sendMail, TEMPLATES } from '@repo/mailer';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';

import { ISignUpBody, ILoginBody, ISignUpResponse, ILoginResponse } from './auth.types';

const signUpService = async (body: ISignUpBody): Promise<ISignUpResponse> => {
    const trx = await User.startTransaction();
    try {
        const { first_name, last_name, email, password } = body;

        const userAttributes = ['id', 'email'];
        const userDetails = await User
            .query()
            .select(...userAttributes)
            .where({ email: email })
            .first();

        if (userDetails) throw new CustomError(ResponseMessages.USER.ALREADY_EXISTS, StatusCodes.CONFLICT);

        const user = await User
            .query(trx)
            .insert({
                first_name: first_name,
                last_name: last_name,
                email: email,
                // password: passwordHelper.encryptPassword(body.password),
                password: password,
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

        // const emailVerificationToken = generateRandom.generateRandomString(25, false);
        // await user.$query(trx).patch({ email_verification_token: 'emailVerificationToken' });
        await user.$query(trx).patch({ token: token });

        // const accountVerificationToken = customToken.generateToken({
        //     email: user.email,
        //     email_verification_token: emailVerificationToken,
        // });

        // send verification email
        // emailAndNotification('email', {
        //     username: projectUser.fullname,
        //     email: user.email,
        //     link: `${link}/${constant.adminAccountVerificationLink}/${accountVerificationToken}`,
        //     template: constant.templateName['Account Verification'],
        //     subject: 'Welcome to Oasis!',
        // });

        sendMail(user.email, 'Welcome to Oasis!', TEMPLATES.WELCOME, {
            name: user.first_name
        });

        await trx.commit();
        return { token, loginDetails: data };
    } catch (error) {
        await trx.rollback();
        log.error('signUpService Catch: ', error);
        throw error;
    }
};

const loginService = async (body: ILoginBody): Promise<ILoginResponse> => {
    try {
        const { email, password } = body;

        const user = await User
            .query()
            .where({ email: email })
            .first();

        if (!user || user.deleted_at) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.BAD_REQUEST);

        if (+user.status !== constants.userStatus['Active']) throw new CustomError(ResponseMessages.USER.NOT_ACTIVE, StatusCodes.BAD_REQUEST);

        // const isPasswordValid = passwordHelper.comparePassword(password, user.password);
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) throw new Error('Invalid password');

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