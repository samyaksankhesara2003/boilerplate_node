import { Router, Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { validateRequest } from '@repo/validator';
import { userValidation } from './helpers/user.validation';
import { userController } from './user.controller';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
};

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter
});

const router: Router = Router();

router.post('/', validateRequest(userValidation.createUserSchema), userController.createUser);
router.get('/:id', validateRequest(userValidation.getUserByIdSchema), userController.getUserById);
router.get('/', validateRequest(userValidation.getAllUserSchema), userController.getAllUsers);
router.patch('/', upload.single('profile_url'), validateRequest(userValidation.updateUserSchema), userController.updateUser);
router.patch('/:id', validateRequest(userValidation.updateUserStatusSchema), userController.updateUserStatus);
router.delete('/:id', validateRequest(userValidation.deleteUserSchema), userController.deleteUser);

export const userRoutes = router;
