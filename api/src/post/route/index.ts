import express from 'express'
import postValidator from '../validator'
import middleware from '../../middleware'
import postController from '../controller'

const router = express.Router()

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

router
  .get(
    '/posts',
    postValidator.checkReadAll(),
    middleware.handleValidation,
    postController.index
  )
  .post(
    '/posts',
    postValidator.checkCreateOne(),
    [middleware.authenticateToken, middleware.handleValidation],
    postController.save
  )

router
  .get(
    '/posts/:id',
    postValidator.checkReadOne(),
    middleware.handleValidation,
    postController.show
  )
  .put(
    '/posts/:id',
    postValidator.checkUpdateOne(),
    [middleware.authenticateToken, middleware.handleValidation],
    postController.update
  )
  .delete(
    '/posts/:id',
    postValidator.checkReadOne(),
    [middleware.authenticateToken, middleware.handleValidation],
    postController.delete
  )

export default router
