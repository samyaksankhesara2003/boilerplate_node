import Stripe from 'stripe';
import { log } from '@repo/logger';
import { stripeConfig } from '@repo/config';

// Create a Stripe instance
const stripeInstance = new Stripe(stripeConfig.stripeSecretKey);

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
            automatic_payment_methods: { enabled: true },
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
 * @description Verify a Stripe webhook request.
 */
const verifyWebhookRequest = async (stripe_signature: string, body: string): Promise<Stripe.Event> => {
    try {
        const event = stripeInstance.webhooks.constructEvent(body, stripe_signature, stripeConfig.stripeWebHookSecret);
        if (!event) throw new Error('Error verifying webhook request');

        return event;
    } catch (error) {
        log.error('verifyWebhookRequest Catch:', error);
        throw error;
    }
};

export const stripeService = {
    createPaymentIntent,
    verifyWebhookRequest
};