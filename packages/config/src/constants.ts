export const constants = {

    // Languages
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr', 'es', 'de', 'hi'],

    // Password
    passwordsaltRound: 10,

    // Links
    adminResetForgetLink: 'admin/auth/reset-password',
    adminAccountVerificationLink: 'admin/auth/verify-account',
    adminLogin: 'admin/auth/signin',
    userLogin: 'auth/signin',
    userResetForgetLink: 'auth/reset-password',
    userAccountVerificationLink: 'auth/verify-account',
    superAdminResetForgetLink: 'reset-password',

    // Device Types
    deviceType: {
        'MOBILE': 1,
        'DESKTOP': 2,
        'TABLET': 3
    },

    // Activity types
    activityType: {
        'LOGIN': 1,
        'LOGOUT': 2
    },

    // File Validations and Sizes (in MB)
    defaultFileSize: 10,
    profileImageSize: 10,

    // File Types
    supportedProfileImageTypes: ['image/jpg', 'image/jpeg', 'image/png'],

    // Auth Types
    authType: {
        'EMAIL': 1,
        'PHONE': 2,
        'GOOGLE': 3,
        'FACEBOOK': 4,
        'APPLE': 5,
    },
    authTypeNumberToName: {
        1: 'EMAIL',
        2: 'PHONE',
        3: 'GOOGLE',
        4: 'FACEBOOK',
        5: 'APPLE',
    },

    // User Roles
    role: {
        'Admin': 1,
        'User': 2,
    },
    roleNumberToName: {
        1: 'Admin',
        2: 'User',
    },

    // Common Status
    status: {
        'Active': 1,
        'Inactive': 2,
    },
    statusNumberToName: {
        1: 'Active',
        2: 'Inactive',
    },

    adminStatus: {
        'Active': 1,
        'Inactive': 2,
    },
    adminStatusNumberToName: {
        1: 'Active',
        2: 'Inactive',
    },

    userStatus: {
        'Active': 1,
        'Inactive': 2,
    },
    userStatusNumberToName: {
        1: 'Active',
        2: 'Inactive',
    },

    stripeSupportedCurrencyType: {
        'USD': 1,
        'INR': 2,
    },
    stripeSupportedCurrencyTypeNumberToName: {
        1: 'USD',
        2: 'INR',
    },

    paymentStatus: {
        'Pending': 1,
        'Completed': 2,
        'Failed': 3,
        'Cancelled': 4,
    },
    paymentStatusNumberToName: {
        1: 'Pending',
        2: 'Completed',
        3: 'Failed',
        4: 'Cancelled',
    },

    emailTemplateName: {
        'Registration': 'registration',
        'Forget Password': 'forgetPassword',
    },

    customNotificationType: {
        /**
         * All general notifications
         */
        'General Notification': 1,
    },

    notificationColor: {
        'Red': '0xFFB32218',
        'Yellow': '0xFFB54707',
        'Green': '0xFF039754',
        'Black': '0xFF475467',
        'Blue': '0xFF311B92',
    },
    notificationColorFontWeight: {
        'Red': 700,
        'Yellow': 700,
        'Green': 700,
        'Black': 400,
        'Blue': 700,
    },

    rateLimiter: {
        LOGIN_RATE_LIMIT: {
            'windowMs': 3600000, // +process.env.LOGIN_RATE_LIMIT_WINDOW_MS, // Hour in milliseconds
            'maxLimit': 10, // +process.env.LOGIN_RATE_LIMIT_MAX_LIMIT, // Requests per hour
            'message': 'You have exceeded the your hourly rate limit. Please contact Support.', // Rate limit exceeded message
        },
    },    

    //Feedback types 
    feedback_type:{
        'System': 1,
        'Module': 2
    }
} as const;

export type SupportedLanguage = typeof constants.supportedLanguages[number];
export type SupportedProfileImageType = typeof constants.supportedProfileImageTypes[number];
