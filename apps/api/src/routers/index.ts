import { Router, Request, Response } from 'express';
import commonRoutes from './common.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';

const router: Router = Router();

router.use('/common', commonRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
    });
});

export default router;

