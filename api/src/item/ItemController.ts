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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      return res.json({ message: 'Post successfully deleted.' })
    } catch (error) {
      return res.status(500).send('Failed to delete')
    }
  }
}

export default new ItemController()
