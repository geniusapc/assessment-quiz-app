import { body } from 'express-validator';

export const registerValidator = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    body('name').isLength({ min: 2 }).withMessage('Name should be atleast 2 chars long')
];

export const loginValidator = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
];
