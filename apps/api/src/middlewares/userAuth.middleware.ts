import { NextFunction, Request, Response } from 'express';
import { User } from '@repo/db';
import { jwtUtil } from '@repo/tokens';
// import { JwtPayload } from 'jsonwebtoken';
// import { commonResponse } from '@repo/config';
import { log } from '@repo/logger';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    //   const token = jwt.findJwt(req);
    // const token = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        //   return res.withError(commonResponse.NOT_AUTHENTICATED.message, commonResponse.NOT_AUTHENTICATED.status);
        return res.status(401).json({ message: 'Not authenticated' });
        // return next();
    }

    try {
        const decoded = jwtUtil.validateJwt(token);

        if (decoded) {
            const attributes = ['id', 'first_name', 'last_name', 'email', 'profile_url', 'token', 'role', 'status'];
            let user = await User.query().select(...attributes).findById(decoded.data.id);

            if (!user) {
                // throw commonResponse.NOT_AUTHENTICATED;
                return res.status(401).json({ message: 'Not authenticated' });
            }

            if (user.token !== token) {
                // throw commonResponse.NOT_AUTHENTICATED;
                return res.status(401).json({ message: 'Not authenticated' });
            }
            req.user = user;
            return next();
        }
    } catch (error) {
        log.error(error);
        // return res.withError(commonResponse.SESSION_EXPIRED.message, commonResponse.SESSION_EXPIRED.status);
        return res.status(401).json({ message: 'Session expired' });
        // return next();
    }
};
