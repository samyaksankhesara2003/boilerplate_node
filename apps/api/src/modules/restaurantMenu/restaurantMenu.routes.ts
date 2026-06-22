import { Router, Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { restaurantMenuController } from './restaurantMenu.controller';
const router: Router = Router();

const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'));
    }
};

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
    fileFilter
});

router.post('/upload', upload.single('menu_file'), restaurantMenuController.uploadMenu);

router.post('/upload-pinecone', restaurantMenuController.uploadMenuToPinecone);

export const restaurantMenuRoutes = router;
