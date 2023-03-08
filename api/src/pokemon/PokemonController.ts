import { UserModel } from '../user/UserModel'
import { PokemonModel } from './PokemonModel'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; iat: number; exp: number }
    }
  }
}

class PokemonController {
  async index(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined
      const offset = req.query?.offset as number | undefined

      const data = await PokemonModel.findAll({
        where: {},
        limit,
        offset,
        include: UserModel,
      })
      return res.json({ data, message: 'Pokemons successfully retrieved.' })
    } catch (error) {
      return res.status(500).send('Failed to retrieve pokemons')
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const data = await PokemonModel.findOne({
        where: { id },
        include: UserModel,
      })

      if (!data) {
        return res.status(404).send('Pokemon not found')
      }
      return res.json({
        data: data.toJSON(),
        message: 'Pokemon successfully retrieved.',
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
      const data = await PokemonModel.create({
        ...req.body,
        id,
        UserId: user?.dataValues.id,
      })

      return res.json({
        data: data.toJSON(),
        message: 'Pokemon successfully created.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }
}

export default new PokemonController()
