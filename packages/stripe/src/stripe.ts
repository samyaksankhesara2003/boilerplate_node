import Stripe from 'stripe';
import { log } from '@repo/logger';
import { stripeConfig } from '@repo/config';

// Create a Stripe instance
const stripeInstance = new Stripe(stripeConfig.stripeSecretKey);

/**
 * @description Create a Stripe payment intent.
 * @param {string} currency The currency of the payment (INR or USD).
 * @param {number} amount The amount of the payment in cents.
 * @param {string} customer_id The Stripe customer id.
 * @returns {Promise<Stripe.PaymentIntent>} The payment intent.
 * @throws {Error} If the payment intent cannot be created.
 */
const createPaymentIntent = async (currency: 'INR' | 'USD', amount: number, customer_id: string): Promise<Stripe.PaymentIntent> => {
    try {

        const paymentIntent = await stripeInstance.paymentIntents.create({
            customer: customer_id,
            amount: amount * 100,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
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
 * @description Verify a Stripe webhook request.
 * @param {string} stripe_signature The Stripe signature in the request headers.
 * @param {string} body The body of the request.
 * @returns {Promise<Stripe.Event>} The event.
 * @throws {Error} If the request cannot be verified.
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