import { Model } from 'objection';

class BaseModel extends Model {
  id!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
};

export default BaseModel;
