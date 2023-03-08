import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv')

class Middleware {
  handleValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    }
    next()
  }

  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
      }
    )
  }
}

export default new Middleware()
