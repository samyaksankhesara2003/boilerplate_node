import { QueryContext, RelationMappings, RelationMappingsThunk } from 'objection';
import { generateRandomString } from '@repo/utils'
import { constants } from '@repo/config';
import { BaseModel } from './BaseModel';
class User extends BaseModel {

    static get tableName() {
        return 'users';
    };

    social_id!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    mobile_number!: string; 
    profile_url!: string;
    password!: string;
    token!: string | null;
    reset_password_token!: string | null;
    auth_type!: number;  // 1 -> Email, 2 -> Phone, 3 -> Google, 4 -> Facebook, 5 -> Apple
    role!: number;       // 1 -> Admin, 2 -> User
    status!: number;     // 1 -> Active, 2 -> Inactive
    slug! : string;

    // Define a virtual attribute for name
    static get virtualAttributes() {
        return ['fullname'];
    }
    get fullname() {
        return this.first_name ? `${this.first_name} ${this?.last_name || ''}` : null;
    }

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };

    async $beforeInsert(ctx:QueryContext) {    
        const base = this.first_name?.toLowerCase().replace(/\s+/g, '-');
        let slug = `${base}-${generateRandomString(constants.slugLength)}`;
    
        let count = 0;
        while (await User.query(ctx.transaction).findOne({ slug })) {
          slug = `${base}-${generateRandomString(constants.slugLength)}`;
          count++;
          if (count > 3) break; // Max retries 3
        }
    
        this.slug = `${base}-${generateRandomString(constants.slugLength)}`;
    }
};

export default User;