export const ResponseMessages = {
    COMMON: {
        SUCCESS: 'common.success',
        ERROR: 'common.error',
    },
    USER: {
        FETCH_SUCCESS: 'user.fetch_success',
        NOT_FOUND: 'user.not_found',
        CREATE_SUCCESS: 'user.create_success',
    },
    AUTH: {
        LOGIN_SUCCESS: 'auth.login_success',
        INVALID_CREDENTIALS: 'auth.invalid_credentials',
    },
    SERVER: {
        ERROR: 'server.error',
    }
} as const;
