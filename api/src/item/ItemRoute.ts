import express from 'express'
import itemValidator from './ItemValidator'
import middleware from '../middleware'
import itemController from './ItemController'

const router = express.Router()

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

router
  .put(
    '/items',
    itemValidator.checkAddOne(),
    [middleware.authenticateToken, middleware.handleValidation],
    itemController.add
  )
  .get('/items', middleware.authenticateToken, itemController.index)

router.delete(
  '/items/:id',
  itemValidator.checkAddOne(),
  [middleware.authenticateToken, middleware.handleValidation],
  itemController.delete
)

export default router
