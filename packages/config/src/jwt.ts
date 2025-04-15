import { config as loadEnv } from 'dotenv';
import { envFilePath } from './envFilePath';
loadEnv({ path: envFilePath });

export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || 'Techuz',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'Techuz',
    jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400,  // 1d
    jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800,  // 7d
};
