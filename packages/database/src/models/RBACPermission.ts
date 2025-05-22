import { BaseModel } from './BaseModel';

class RBACPermission extends BaseModel {
    static get tableName() {
        return 'rbac_permissions';
    }

    module_name!: string;
    admin!: string;  // '0' -> Not Granted, '1' -> Granted
    user!: string;   // '0' -> Not Granted, '1' -> Granted
    manager!: string; // '0' -> Not Granted, '1' -> Granted
}

export default RBACPermission; 