import express from 'express'
import userValidator from '../validator'
import middleware from '../../middleware'
import userController from '../controller'

const router = express.Router()

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

router.get(
  '/login',
  userValidator.checkLogin(),
  middleware.handleValidation,
  userController.login
)

router.post(
  '/register',
  userValidator.checkCreateOne(),
  middleware.handleValidation,
  userController.register
)

export default router
