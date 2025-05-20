export const stripeConfig = {
    stripeLiveMode: Number(process.env.STRIPE_LIVE_MODE) || 0,  // 0=> Test Mode, 1=> Live Mode
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebHookSecret: process.env.STRIPE_WEB_HOOK_SECRET || '',
};
