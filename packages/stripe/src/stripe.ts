import Stripe from 'stripe';
import { log } from '@repo/logger';
import { stripeConfig } from '@repo/config';

// Create a Stripe instance
const stripeInstance = new Stripe(stripeConfig.stripeSecretKey);

/**
 * @author Jitendra Singh
 * @description Creates a new customer in Stripe.
 */
const createCustomer = async (name: string, email: string): Promise<Stripe.Customer> => {
    try {
        const customer = await stripeInstance.customers.create({ name, email });

        if (!customer) throw new Error('Error creating customer');

        return customer;
    } catch (error) {
        log.error('createCustomer Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Create a Stripe payment intent.
 */
const createPaymentIntent = async (currency: 'INR' | 'USD', amount: number, customer_id: string): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripeInstance.paymentIntents.create({
            customer: customer_id,
            amount: amount * 100,
            currency: currency,
            automatic_payment_methods: { enabled: true }
            // payment_method_types: ['card'],
        });
        if (!paymentIntent) throw new Error('Error creating payment intent');

        return paymentIntent;
    } catch (error) {
        log.error('createPaymentIntent Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Create a Stripe subscription for the given customer.
 */
const createSubscription = async (customerId: string, priceId: string, promoCode?: string): Promise<{ id: string; client_secret?: string }> => {
    try {
        const subscription = await stripeInstance.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            ...(promoCode && { discounts: [{ coupon: promoCode }] }),
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription', payment_method_types: ['card'] },
            expand: ['latest_invoice.confirmation_secret']
        });

        if (!subscription) throw new Error('Error creating subscription');

        return {
            id: subscription.id,
            client_secret:
                typeof subscription.latest_invoice === 'string' ? undefined : subscription.latest_invoice?.confirmation_secret?.client_secret
        };
    } catch (error) {
        log.error('createSubscription Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Upgrades a Stripe subscription item for the given subscription.
 */
const upgradeSubscription = async (
    subscriptionId: string,
    subscriptionItemId: string,
    priceId: string,
    promoCode?: string
): Promise<{ id: string; client_secret?: string }> => {
    try {
        const subscription = await stripeInstance.subscriptions.update(subscriptionId, {
            items: [
                {
                    id: subscriptionItemId,
                    price: priceId
                }
            ],
            ...(promoCode && { discounts: [{ coupon: promoCode }] }),
            proration_behavior: 'none',
            billing_cycle_anchor: 'now',
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription', payment_method_types: ['card'] },
            expand: ['latest_invoice.confirmation_secret']
        });

        if (!subscription) throw new Error('Error upgrading subscription');

        return {
            id: subscription.id,
            client_secret:
                typeof subscription.latest_invoice === 'string' ? undefined : subscription.latest_invoice?.confirmation_secret?.client_secret
        };
    } catch (error) {
        log.error('upgradeSubscription Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Cancels a Stripe subscription.
 */
const cancelSubscription = async (subscriptionId: string): Promise<{ is_cancelled: boolean }> => {
    try {
        await stripeInstance.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

        return { is_cancelled: true };
    } catch (error) {
        log.error('cancelSubscription Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Validates a Stripe promotion code.
 */
const validatePromoCode = async (promo_code: string): Promise<Stripe.Coupon> => {
    try {
        const promoCode = await stripeInstance.promotionCodes.list({ code: promo_code, active: true });

        if (!promoCode?.data?.length) throw new Error('Invalid Promo Code');

        const promoCodeData = promoCode.data.find(item => item.code === promo_code);

        if (!promoCodeData) throw new Error('Invalid Promo Code');

        if (!promoCodeData['active']) throw new Error('Promo code not active');

        if (!promoCodeData['coupon']['valid']) throw new Error('Invalid Promo Code');

        return promoCodeData.coupon;
    } catch (error) {
        log.error('validatePromoCode Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Verify a Stripe webhook request.
 */
const verifyWebhookRequest = async (stripe_webhook_secret: string, stripe_signature: string, body: string): Promise<Stripe.Event> => {
    try {
        const event = stripeInstance.webhooks.constructEvent(body, stripe_signature, stripe_webhook_secret);
        if (!event) throw new Error('Error verifying webhook request');
        return event;
    } catch (error) {
        log.error('verifyWebhookRequest Catch:', error);
        throw error;
    }
};

export const stripeService = {
    createCustomer,
    createPaymentIntent,
    createSubscription,
    upgradeSubscription,
    cancelSubscription,
    validatePromoCode,
    verifyWebhookRequest
};
