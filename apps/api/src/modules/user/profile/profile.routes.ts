import { Router, Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { validateRequest } from '@repo/validator';
import { profileController } from './profile.controller';
import { profileValidation } from './helpers/profile.validation';

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

router.get('/', profileController.getProfile);
router.patch('/', upload.single('profile_image'), validateRequest(profileValidation.updateProfileSchema), profileController.updateProfile);
router.patch('/password', validateRequest(profileValidation.changePasswordSchema), profileController.changePassword);
router.post('/logout', validateRequest(profileValidation.logoutSchema), profileController.logout);

export const profileRoutes = router;
