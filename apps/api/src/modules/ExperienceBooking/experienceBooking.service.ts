import { log } from '@repo/logger';
import { Experience, ExperienceBooking, ExperiencePrice } from '@repo/db';
// import { stripeService } from '@repo/stripe';
import { IExperienceParams, IExperienceBody, IBookExperienceParams } from './experienceBooking.types';
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

        if (!experienceBooking) throw new Error('Experience Booking not found');

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

const bookExperienceService = async (user: IUser, params: IBookExperienceParams, body: IExperienceBody): Promise<ExperienceBooking> => {
    try {
        const { experience_id } = params;
        const { experience_price_id, guest_count: guests, total_price, service_fee, total_amount } = body;

        const experiencePrice = await ExperiencePrice
            .query()
            .select('id')
            .findOne({
                id: experience_price_id,
                experience_id
            });

        if (!experiencePrice) throw new Error('Experience Price not found');

        const experienceData = await Experience
            .query()
            .select('id')
            .findById(experience_id);

        if (!experienceData) throw new Error('Experience not found');

        const experienceBooking = await ExperienceBooking
            .query()
            .insert({
                user_id: user.id,
                experience_id,
                experience_price_id,
                guests,
                total_price,
                service_fee,
                total_amount
            });

        return experienceBooking;
    } catch (error) {
        log.error('bookExperienceService Catch: ', error);
        throw error;
    }
};

export const experienceBookingService = {
    getBookingExperienceService,
    listBookingExperienceService,
    bookExperienceService
};