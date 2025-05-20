export const TEMPLATES = {
    WELCOME: 'welcome',
    FORGOT_PASSWORD: 'forgotPassword'
} as const;

export type TemplateName = (typeof TEMPLATES)[keyof typeof TEMPLATES];
