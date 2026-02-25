if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}

export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400 // 1d
};
