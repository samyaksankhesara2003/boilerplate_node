export const stripeConfig = {
    stripeLiveMode: Number(process.env.STRIPE_LIVE_MODE) || 0,  // 0 = test mode, 1 = live mode
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebHookSecret: process.env.STRIPE_WEB_HOOK_SECRET || '',
};
