import { body, query, param } from 'express-validator'

class UserValidator {
  checkCreateOne() {
    return [
      body('name').notEmpty().withMessage('Name is required.'),
      body('email').notEmpty().withMessage('Email is required.'),
    ]
  }

  checkLogin() {
    return [
      body('email').notEmpty().withMessage('Email is required.'),
      body('password').notEmpty().withMessage('Password is required.'),
    ]
  }

  checkUpdateOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('User ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
      body('name').notEmpty().withMessage('Name is required.'),
      body('email').notEmpty().withMessage('Email is required.'),
    ]
  }

  checkReadOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('User ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
    ]
  }
}

export default new UserValidator()
