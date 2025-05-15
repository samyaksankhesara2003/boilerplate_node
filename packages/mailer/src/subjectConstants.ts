import { appConfig } from '@repo/config';

export const SUBJECTS = {
    WELCOME: `Welcome to ${appConfig.appName}`,
    FORGOT_PASSWORD: 'Forgot Password',
    RESET_PASSWORD: 'Reset Password',
    ACCOUNT_VERIFICATION: 'Account Verification',
    EMAIL_VERIFICATION: 'Email Verification',
    INVITATION: 'Invitation',
} as const;

export type TemplateName = (typeof SUBJECTS)[keyof typeof SUBJECTS];
