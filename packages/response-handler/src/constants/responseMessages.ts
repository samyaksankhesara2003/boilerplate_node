export const ResponseMessages = {
    SERVER: {
        ERROR: 'server.error',
    },
    COMMON: {
        SUCCESS: 'common.success',
        ERROR: 'common.error',
        VALIDATION_ERROR: 'common.validation_error',
        NOT_AUTHENTICATED: 'common.not_authenticated',
        SESSION_EXPIRED: 'common.session_expired',
        UNSUPPORTED_FILE_TYPE: 'common.unsupported_file_type',
        NOT_FOUND: 'common.not_found',
        FETCH_SUCCESS: 'common.fetch_success',
        LIST_SUCCESS: 'common.list_success',
        CREATE_SUCCESS: 'common.create_success',
        UPDATE_SUCCESS: 'common.update_success',
        DELETE_SUCCESS: 'common.delete_success',
    },
    USER: {
        FETCH_SUCCESS: 'user.fetch_success',
        NOT_FOUND: 'user.not_found',
        ALREADY_EXISTS: 'user.already_exists',
        NOT_ACTIVE: 'user.not_active',
        SIGNUP_SUCCESS: 'user.signup_success',
    },
    AUTH: {
        LOGIN_SUCCESS: 'auth.login_success',
        INVALID_CREDENTIALS: 'auth.invalid_credentials',
    },
    PROFILE: {
        FETCH_SUCCESS: 'profile.fetch_success',
        UPDATE_SUCCESS: 'profile.update_success'
    },
    PASSWORD: {
        INVALID_PASSWORD: 'password.invalid_password',
        PASSWORD_CANNOT_BE_SAME_AS_CURRENT: 'password.password_cannot_be_same_as_current',
        PASSWORD_CHANGE_SUCCESS: 'password.password_change_success',
    },
    COUNTRY: {
        FETCH_SUCCESS: 'country.fetch_success',
        NOT_FOUND: 'country.not_found',
        LIST_SUCCESS: 'country.list_success',
    },
    STATE: {
        FETCH_SUCCESS: 'state.fetch_success',
        NOT_FOUND: 'state.not_found',
        LIST_SUCCESS: 'state.list_success',
    }
} as const;
