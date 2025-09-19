import { Router } from 'express';
import * as ctrl from '@/controllers/auth.controller';
import { registerValidator, loginValidator } from '@/validators/auth.validator';
import { validateRequest } from '@/middlewares/validate.middleware';

const router = Router();

router.post('/register', registerValidator, validateRequest, ctrl.register);
router.post('/login', loginValidator, validateRequest, ctrl.login);


export default router;