import { QueryContext, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { UserSubscription } from './index';

class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    stripe_customer_id!: string;
    social_id!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    mobile_number!: string;
    profile_url!: string;
    password!: string;
    token!: string | null;
    reset_password_token!: string | null;
    auth_type!: number; // 1-> Email, 2-> Phone, 3-> Google, 4-> Facebook, 5-> Apple
    role!: number; // 1-> Admin, 2-> User
    status!: number; // 1-> Active, 2-> Inactive
    slug!: string;

    user_subscriptions!: UserSubscription[];

    // Define a virtual attribute for name
    static get virtualAttributes() {
        return ['fullname'];
    }
    get fullname() {
        return this.first_name ? `${this.first_name} ${this?.last_name || ''}` : '';
    }

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };

    async $beforeInsert(ctx: QueryContext) {
        const base = this.fullname?.trim().toLowerCase().replace(/\s+/g, '-');
        let slug = base;
        let count = 1;

        while (await User.query(ctx.transaction).findOne({ slug })) {
            slug = `${base}-${count}`;
            count++;
        }

        this.slug = slug;
    }
}

export default User;
