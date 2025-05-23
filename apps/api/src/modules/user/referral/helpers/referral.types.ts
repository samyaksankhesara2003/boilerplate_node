export interface IReferralQuery {
  user_id?: number;
  recordPerPage?: number;
  pageNumber?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  startRange?: number;
  endRange?: number;
}