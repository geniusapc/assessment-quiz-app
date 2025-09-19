import { Router } from 'express';
import * as ctrl from '@/controllers/questions.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { createQuestionValidator, updateQuestionValidator } from '@/validators/question.validator';
import { validateRequest } from '@/middlewares/validate.middleware';

const router = Router();
router.use(authMiddleware);

router.get('/', ctrl.getUserQuestions);
router.get('/:id', ctrl.getQuestion);
router.post('/', createQuestionValidator, validateRequest, ctrl.createQuestion);
router.put('/:id', updateQuestionValidator, validateRequest, ctrl.updateQuestion);
router.delete('/:id', ctrl.deleteQuestion);

export default router;
