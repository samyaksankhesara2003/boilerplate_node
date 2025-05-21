export const ResponseMessages = {
    SERVER: {
        ERROR: 'server.error',
        SSL_CERTIFICATES_NOT_FOUND: 'server.ssl_certificates_not_found',
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
        ACCOUNT_DELETED: 'user.account_deleted',
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
        INVALID_FORGET_PASSWORD_LINK: 'password.invalid_forget_password_link',
        INVALID_RESET_PASSWORD_LINK: 'password.invalid_reset_password_link',
        FORGET_PASSWORD_LINK_EXPIRED: 'password.forget_password_link_expired',
        LINK_VERIFICATION_SUCCESS: 'password.link_verification_success',
        FORGOT_PASSWORD_SUCCESS: 'password.forgot_password_success',
        RESET_PASSWORD_SUCCESS: 'password.reset_password_success',
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
    },
    NOTIFICATION: {
        FETCH_SUCCESS: 'notification.fetch_success',
        NOT_FOUND: 'notification.not_found',
        LIST_SUCCESS: 'notification.list_success',
        NOTIFICATION_HANDLER_NOT_INITIALIZED: 'notification.notification_handler_not_initialized',
    },
    SOCKET: {
        SOCKET_NOT_INITIALIZED: 'socket.socket_not_initialized',
    }
} as const;
