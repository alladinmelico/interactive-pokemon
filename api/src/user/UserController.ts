import { UserModel } from './UserModel'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { generateAccessToken } from '../utils/jwt.utils'
import bcrypt from 'bcrypt'
import { omit } from 'lodash'

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const data = await UserModel.scope('auth').findOne({
        where: { email },
      })

      if (!data) {
        return res.json({ error: 'Invalid email or password' })
      }

      const hashedPassword = await bcrypt.compare(
        password,
        data?.dataValues.password as string
      )

      if (hashedPassword === false || !data) {
        return res.json({ error: 'Invalid email or password' })
      }

      const token = generateAccessToken({ email })

      return res.json({
        data: { ...omit(data.toJSON(), 'password'), token },
        message: 'User successfully logged in.',
      })
    } catch (error) {
      return res.status(500).send('Failed to login')
    }
  }

  async register(req: Request, res: Response) {
    const id = uuidv4()
    try {
      const password = await bcrypt.hash(req.body.password, 10)
      const data = await UserModel.create({
        ...req.body,
        password,
        id,
      })
      const token = generateAccessToken({ email: req.body.email })

      return res.json({
        data: { ...omit(data.toJSON(), 'password'), token },
        message: 'User successfully created.',
      })
    } catch (error) {
      return res.status(500).send('Failed to Register')
    }
  }
}

export default new UserController()
