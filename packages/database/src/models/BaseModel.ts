import { Model } from 'objection';

class BaseModel extends Model {
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
}

export default BaseModel;
