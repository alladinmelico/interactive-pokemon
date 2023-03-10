import { body, query, param } from 'express-validator'

class PostValidator {
  checkCreateOne() {
    return [
      body('title').notEmpty().withMessage('Title is required.'),
      body('description').notEmpty().withMessage('Description is required.'),
    ]
  }

  checkUpdateOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Post ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
      body('title').notEmpty().withMessage('Title is required.'),
      body('description').notEmpty().withMessage('Description is required.'),
    ]
  }

  checkReadAll() {
    return [
      query('limit').default(10).isInt({ min: 1, max: 10 }),
      query('offset').default(0).isInt({ min: 0 }),
    ]
  }

  checkReadOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Post ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
    ]
  }
}

export default new PostValidator()
