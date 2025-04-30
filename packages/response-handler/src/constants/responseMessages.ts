export const ResponseMessages = {
    COMMON: {
        SUCCESS: 'common.success',
        ERROR: 'common.error',
        VALIDATION_ERROR: 'common.validation_error',
        NOT_AUTHENTICATED: 'common.not_authenticated',
        SESSION_EXPIRED: 'common.session_expired',
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
    EXPERIENCE_CATEGORY: {
        FETCH_SUCCESS: 'experience_category.fetch_success',
        NOT_FOUND: 'experience_category.not_found',
        LIST_SUCCESS: 'experience_category.list_success',
    },
    EXPERIENCE: {
        FETCH_SUCCESS: 'experience.fetch_success',
        NOT_FOUND: 'experience.not_found',
        CREATE_SUCCESS: 'experience.create_success',
        LIST_SUCCESS: 'experience.list_success',
    },
    EXPERIENCE_PRICE: {
        FETCH_SUCCESS: 'experience_price.fetch_success',
        NOT_FOUND: 'experience_price.not_found',
    },
    EXPERIENCE_SCHEDULE: {
        FETCH_SUCCESS: 'experience_schedule.fetch_success',
        NOT_FOUND: 'experience_schedule.not_found',
        LIST_SUCCESS: 'experience_schedule.list_success',
    },
    EXPERIENCE_BOOKING: {
        FETCH_SUCCESS: 'experience_booking.fetch_success',
        NOT_FOUND: 'experience_booking.not_found',
        LIST_SUCCESS: 'experience_booking.list_success',
        CREATE_SUCCESS: 'experience_booking.create_success',
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
    SERVER: {
        ERROR: 'server.error',
    }
} as const;
