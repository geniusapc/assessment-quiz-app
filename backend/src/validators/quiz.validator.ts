import { body } from "express-validator";

export const submitAnswersValidator = [
    body("answers")
        .isArray({ min: 1 })
        .withMessage("Answers must be a non-empty array"),

    body("answers.*.questionId")
        .isInt({ gt: 0 })
        .withMessage("Each questionId must be a positive integer"),

    body("answers.*.answer")
        .isInt({ min: 0 })
        .withMessage("Answer must be a valid option index (number >= 0)"),
];
