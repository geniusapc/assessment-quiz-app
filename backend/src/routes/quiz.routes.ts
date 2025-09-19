import { Router } from 'express';
import * as ctrl from '@/controllers/quiz.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { submitAnswersValidator } from '@/validators/quiz.validator';
import { validateRequest } from '@/middlewares/validate.middleware';

const router = Router();
router.get('/start', authMiddleware, ctrl.listQuestions);
router.post('/submit', submitAnswersValidator, validateRequest, authMiddleware, ctrl.submitAnswers);

export default router;
