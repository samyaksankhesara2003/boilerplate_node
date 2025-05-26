import { BaseModel } from './BaseModel';

class RBACPermission extends BaseModel {
    static get tableName() {
        return 'role_permissions';
    }

    module_name!: string;
    admin!: string;  // '1' -> Not Granted, '2' -> Granted
    user!: string;   // '1' -> Not Granted, '2' -> Granted
    manager!: string; // '1' -> Not Granted, '2' -> Granted
}

export default RBACPermission; 