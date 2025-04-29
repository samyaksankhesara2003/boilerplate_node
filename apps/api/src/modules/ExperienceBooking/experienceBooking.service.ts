import { log } from '@repo/logger';
import { constants } from '@repo/config';
import { stripeService } from '@repo/stripe';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { Experience, ExperienceBooking, ExperiencePrice, ExperienceTransaction } from '@repo/db';
import { IExperienceParams, IExperienceBody, IBookExperienceParams, IBookExperienceResponse } from './experienceBooking.types';
import { IUser } from '../User/Profile/profile.types';
import { IExperienceQuery } from './experienceBooking.types';

const getBookingExperienceService = async (user: IUser, params: IExperienceParams): Promise<ExperienceBooking> => {
    try {
        const { experience_booking_id } = params;

        const experienceBookingAttributes = ['id', 'user_id', 'experience_id', 'experience_price_id', 'guests', 'total_price', 'service_fee', 'total_amount', 'status'];

        const experienceBooking = await ExperienceBooking
            .query()
            .select(...experienceBookingAttributes)
            .findOne({
                id: experience_booking_id,
                user_id: user.id
            });

        if (!experienceBooking) throw new CustomError(ResponseMessages.EXPERIENCE_BOOKING.NOT_FOUND, StatusCodes.NOT_FOUND);

        return experienceBooking;
    } catch (error) {
        log.error('getBookingExperienceService Catch: ', error);
        throw error;
    }
};

const listBookingExperienceService = async (user: IUser, query: IExperienceQuery): Promise<ExperienceBooking[]> => {
    try {
        const { experience_id, experience_booking_id, status } = query;

        const experienceBookingAttributes = ['id', 'user_id', 'experience_id', 'experience_price_id', 'guests', 'total_price', 'service_fee', 'total_amount', 'status'];

        const experienceBookingQuery = ExperienceBooking
            .query()
            .select(...experienceBookingAttributes)
            .where('user_id', user.id);

        if (experience_id) experienceBookingQuery.where('experience_id', experience_id);

        if (experience_booking_id) experienceBookingQuery.where('id', experience_booking_id);

        if (status) experienceBookingQuery.where('status', status);

        const experienceBooking = await experienceBookingQuery;

        return experienceBooking;
    } catch (error) {
        log.error('listBookingExperienceService Catch: ', error);
        throw error;
    }
};

const bookExperienceService = async (user: IUser, params: IBookExperienceParams, body: IExperienceBody): Promise<IBookExperienceResponse> => {
    const trx = await ExperienceBooking.startTransaction();
    try {
        const { experience_id } = params;
        const { experience_price_id, guest_count: guests, total_price, service_fee, total_amount } = body;

        const experiencePrice = await ExperiencePrice
            .query()
            .select('id', 'currency')
            .findOne({
                id: experience_price_id,
                experience_id
            });

        if (!experiencePrice) throw new CustomError(ResponseMessages.EXPERIENCE_PRICE.NOT_FOUND, StatusCodes.NOT_FOUND);

        const experienceData = await Experience
            .query()
            .select('id')
            .findById(experience_id);

        if (!experienceData) throw new CustomError(ResponseMessages.EXPERIENCE.NOT_FOUND, StatusCodes.NOT_FOUND);

        const experienceBooking = await ExperienceBooking
            .query(trx)
            .insert({
                user_id: user.id,
                experience_id,
                experience_price_id,
                guests,
                total_price,
                service_fee,
                total_amount
            });

        const paymentIntent = await stripeService.createPaymentIntent(constants.stripeSupportedCurrencyTypeNumberToName[experiencePrice.currency], total_amount, 'cus_RxoyRNl8sf1aaR');

        await ExperienceTransaction
            .query(trx)
            .insert({
                user_id: user.id,
                experience_booking_id: experienceBooking.id,
                stripe_payment_intent_id: paymentIntent.id,
                currency: experiencePrice.currency,
                amount: total_amount,
                payment_status: constants.paymentStatus['Pending']
            });

        await trx.commit();

        return { payment_intent_id: paymentIntent.id, payment_intent_client_secret: paymentIntent.client_secret };
    } catch (error) {
        await trx.rollback();
        log.error('bookExperienceService Catch: ', error);
        throw error;
    }
};

const bookingExperiencePaymentVerificationWebhookService = async (request: any): Promise<boolean> => {
    const trx = await ExperienceBooking.startTransaction();
    try {
        const stripeSignature = request?.headers['stripe-signature'];
        let event: any = null;

        try {
            event = stripeService.verifyWebhookRequest(stripeSignature, request);
        }
        catch (err) {
            await trx.rollback();
            throw new Error('Bad Request');
        }

        const transaction = await ExperienceTransaction
            .query()
            .where('stripe_payment_intent_id', event.data.object.payment_intent)
            .andWhereNot('payment_status', constants.paymentStatus['Completed'])
            .orderBy('created_at', 'desc')
            .first();

        if (!transaction) {
            await trx.rollback();
            if (event?.data?.object?.invoice) return true;
            throw new CustomError(ResponseMessages.EXPERIENCE_BOOKING.NOT_FOUND, StatusCodes.NOT_FOUND);
        }

        if (transaction.payment_status === +constants.paymentStatus['Completed']) {
            await trx.commit();
            return true;
        }

        if (event.type === 'charge.failed') {

            await transaction.$query(trx).patch({
                payment_status: constants.paymentStatus['Failed'],
                stripe_response: JSON.stringify(event),
            })
                .where('id', transaction.id);

            await ExperienceBooking
                .query(trx)
                .patch({ status: constants.experienceBookingStatus['Rejected'] })
                .where({ id: transaction.experience_booking_id });

            await trx.commit();
            return true;
        }

        await transaction.$query(trx).patch({
            stripe_payment_intent_id: event?.data?.object?.id || null,
            stripe_invoice_url: '',
            payment_status: constants.paymentStatus['Completed'],
            stripe_response: JSON.stringify(event),
        })
            .where('id', transaction.id);

        await ExperienceBooking
            .query(trx)
            .patch({ status: constants.experienceBookingStatus['Accepted'] })
            .where({ id: transaction.experience_booking_id });

        await trx.commit();
        return true;
    } catch (error) {
        await trx.rollback();
        log.error('paymentVerificationWebhookService Catch: ', error);
        throw error;
    }
};

export const experienceBookingService = {
    getBookingExperienceService,
    listBookingExperienceService,
    bookExperienceService,
    bookingExperiencePaymentVerificationWebhookService
};