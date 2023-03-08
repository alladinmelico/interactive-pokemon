import express from 'express'
import pokemonValidator from './PokemonValidator'
import middleware from '../middleware'
import pokemonController from './PokemonController'

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
    '/pokemons',
    pokemonValidator.checkReadAll(),
    middleware.handleValidation,
    pokemonController.index
  )
  .post(
    '/pokemons',
    pokemonValidator.checkCreateOne(),
    [middleware.authenticateToken, middleware.handleValidation],
    pokemonController.save
  )

router.get(
  '/pokemons/:id',
  pokemonValidator.checkReadOne(),
  middleware.handleValidation,
  pokemonController.show
)

export default router
