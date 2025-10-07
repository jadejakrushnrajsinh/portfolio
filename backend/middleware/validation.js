import { body, param, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

const validateContact = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("subject")
    .isLength({ min: 3 })
    .withMessage("Subject must be at least 3 characters long"),
  body("message")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long"),
  handleValidationErrors,
];

const validateProject = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("technologies")
    .isArray({ min: 1 })
    .withMessage("Technologies must be an array with at least one item"),
  handleValidationErrors,
];

const validateProjectId = [
  param("id").isMongoId().withMessage("Invalid project ID"),
  handleValidationErrors,
];

export { validateLogin, validateContact, validateProject, validateProjectId };
