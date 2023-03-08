import { UserModel } from '../user/UserModel'
import { PokemonModel, IPokemon } from './PokemonModel'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { PokemonRequest } from './PokemonValidator'

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
      const data = await PokemonModel.findAll({
        where: {},
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
      const user = await UserModel.findOne({
        where: { email: req.user?.email },
        include: PokemonModel,
      })
      if (!user) {
        return res.status(404).send('User not found')
      }

      if (user.toJSON().Pokemons?.length) {
        return res.status(403).send('User had already chosen starter pokemons.')
      }

      const pokemons: Array<IPokemon> = req.body.pokemons.map(
        (pokemon: PokemonRequest) => ({
          ...pokemon,
          id: uuidv4(),
          UserId: user?.dataValues.id,
        })
      )

      const data = await PokemonModel.bulkCreate(pokemons)
      return res.json({
        data: data,
        message: 'Pokemon successfully created.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({
        where: { email: req.user?.email },
      })
      if (!user) {
        return res.status(404).send('User not found')
      }
    } catch (error) {
      return res.status(500).send('Failed to add items')
    }
  }
}

export default new PokemonController()
