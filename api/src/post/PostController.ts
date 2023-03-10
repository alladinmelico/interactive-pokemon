import { UserModel } from '../user/UserModel'
import { PostInstance } from './PostModel'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

class PostController {
  async index(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined
      const offset = req.query?.offset as number | undefined

      const data = await PostInstance.findAll({
        where: {},
        limit,
        offset,
        include: UserModel,
      })
      return res.json({ data, message: 'Posts successfully retrieved.' })
    } catch (error) {
      return res.status(500).send('Failed to retrieve posts')
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const data = await PostInstance.findOne({
        where: { id },
        include: UserModel,
      })

      if (!data) {
        return res.status(404).send('Post not found')
      }
      return res.json({
        data: data.toJSON(),
        message: 'Post successfully retrieved.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async save(req: Request, res: Response) {
    try {
      const id = uuidv4()
      const user = await UserModel.findOne({
        where: { email: req.user?.email },
      })
      const data = await PostInstance.create({
        ...req.body,
        id,
        UserId: user?.dataValues.id,
      })

      return res.json({
        data: data.toJSON(),
        message: 'Post successfully created.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const data = await PostInstance.findOne({ where: { id } })

      if (!data) {
        return res.status(404).send('Post not found')
      }

      await data.update({ ...req.body })

      return res.json({
        data: data.toJSON(),
        message: 'Post successfully updated.',
      })
    } catch (error) {
      return res.status(500).send('Failed to update')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const result = await PostInstance.destroy({ where: { id } })
      if (!result) {
        return res.status(404).send('Post not found')
      }
      return res.json({ message: 'Post successfully deleted.' })
    } catch (error) {
      return res.status(500).send('Failed to delete')
    }
  }
}

export default new PostController()
