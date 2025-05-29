import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { userValidation } from './helpers/user.validation';
import { userController } from './user.controller';

const router: Router = Router();

router.get('/:id', validateRequest(userValidation.getUserByIdSchema), userController.getUserById);
router.get('/', validateRequest(userValidation.getAllUserSchema), userController.getAllUsers);
router.patch('/', validateRequest(userValidation.updateUserSchema), userController.updateUser);
router.patch('/:id', validateRequest(userValidation.updateUserStatusSchema), userController.updateUserStatus);
router.delete('/:id', validateRequest(userValidation.deleteUserSchema), userController.deleteUser);

export const userRoutes = router;
