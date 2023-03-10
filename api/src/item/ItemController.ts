import { UserModel } from '../user/UserModel'
import { Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

class ItemController {
  async index(req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({
        where: { email: req.user?.email },
      })

      return res.json({
        data: user?.toJSON().items,
        message: 'Items successfully retrieved.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async add(req: Request, res: Response) {
    try {
      const user = await UserModel.update(
        { items: req.body.items },
        { where: { email: req.user?.email } }
      )
      if (!user) {
        return res.status(404).send('User not found')
      }
      return res.json({ message: 'Item successfully added.' })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }
}

export default new ItemController()
