import { ReferralHistory } from '@repo/db';
import { log } from '@repo/logger';
import { defaultPagination } from '@repo/utils';
import { IReferralQuery } from './helpers/referral.types';

/**
 * @author Sanjay Balai
 * @description Get user's referral history
 */
const getReferralHistoryService = async (params: IReferralQuery) => {
  try {
			const {
         user_id = params.user_id,
         recordPerPage = params.recordPerPage || defaultPagination.perPage,
         pageNumber = params.pageNumber || defaultPagination.page,
         startRange = (+pageNumber - 1) * +recordPerPage,
         orderBy = params.orderBy || defaultPagination.orderBy,
         endRange = +pageNumber * +recordPerPage - 1,
         orderDir = defaultPagination.orderDir,
       } = params;


    const referrals = await ReferralHistory.query()
      .where('referrer_id', user_id!)
      .withGraphFetched('[referrer, referred]')
      .orderBy(orderBy, orderDir)
					.range(startRange, endRange);
			

    return referrals.results;
  } catch (error) {
    log.error('getReferralHistoryService: ', error);
    throw error;
  }
};

export const referralService = {
  getReferralHistoryService,
}; 