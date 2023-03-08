import { body, param } from 'express-validator'

export interface PokemonRequest {
  name: string
  pokemonId: number
}

class PokemonValidator {
  checkCreateMany() {
    return [
      body('pokemons')
        .notEmpty()
        .withMessage('Pokemon is required.')
        .isArray({ min: 3, max: 3 })
        .withMessage('The total Starter Pokemons should be 3'),
      body('pokemons.*.name').notEmpty().withMessage('Name is Required'),
      body('pokemons.*.pokemonId')
        .notEmpty()
        .withMessage('Pokemon ID is Required')
        .isNumeric(),
      body('pokemons.*.pokemonId').custom((val, { req }) => {
        const uniqeIDs = new Set(
          req.body.pokemons.map((pokemon: PokemonRequest) => pokemon.pokemonId)
        )
        if (uniqeIDs.size != 3) {
          throw new Error('Pokemons should be unique')
        }
        return true
      }),
    ]
  }

  checkReadOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Pokemon ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
    ]
  }
}

export default new PokemonValidator()
