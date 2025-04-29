import { Router } from 'express';
import { stateController } from './state.controller';

const router: Router = Router();

router.get('/:state_id', stateController.getState);
router.get('/', stateController.listStates);

export const stateRoutes = router;
