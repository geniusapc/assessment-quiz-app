import { body } from "express-validator";

export const createQuestionValidator = [
  body("questionText")
    .isString()
    .withMessage("Question text must be a string")
    .notEmpty()
    .withMessage("Question text is required"),

  body("options")
    .isArray({ min: 2 })
    .withMessage("Options must be an array with at least 2 items"),

  body("options.*")
    .isString()
    .withMessage("Each option must be a string")
    .notEmpty()
    .withMessage("Options cannot be empty"),

  body("correctAnswer")
    .isInt({ min: 0 })
    .withMessage("Correct answer must be a valid index (number)")
    .custom((value, { req }) => {
      if (!Array.isArray(req.body.options)) return false;
      if (value < 0 || value >= req.body.options.length) {
        throw new Error("Correct answer index is out of range");
      }
      return true;
    }),
];





export const updateQuestionValidator = [
  body("questionText")
    .optional()
    .isString()
    .withMessage("Question text must be a string"),

  body("options")
    .optional()
    .isArray({ min: 2 })
    .withMessage("Options must be an array with at least 2 items"),

  body("options.*")
    .optional()
    .isString()
    .withMessage("Each option must be a string"),

  body("correctAnswer")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Correct answer must be a valid index (number)")
    .custom((value, { req }) => {
      if (req.body.options && Array.isArray(req.body.options)) {
        if (value < 0 || value >= req.body.options.length) {
          throw new Error("Correct answer index is out of range");
        }
      }
      return true;
    }),
];

