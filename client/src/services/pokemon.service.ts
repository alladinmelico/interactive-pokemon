import axios from 'axios'
import authHeader from './auth-header.service'
import { IPokemon } from '../types'

const API_URL = 'https://pokeapi.co/api/v2/'
const LOCAL_POKEMON_ENDPOINT = 'http://localhost:9000/api/pokemons'

export default class PokemonService {
  public async getMyPokemons(): Promise<any> {
    const { data } = await axios.get(LOCAL_POKEMON_ENDPOINT, {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    })
    return await data
  }

  public async saveOnboardingPokemons(pokemons: {
    pokemons: Array<IPokemon>
  }): Promise<any> {
    const { data } = await axios.post(LOCAL_POKEMON_ENDPOINT, pokemons, {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    })
    return await data
  }

  public async getAllPokemon(offset: number): Promise<any> {
    const response = await fetch(`${API_URL}pokemon?limit=9&offset=${offset}`)
    const data = await response.json()
    const allPokemonResponse = Promise.all(
      data.results.map((pokemonItem: { url: string }) =>
        this.getOnePokemon(pokemonItem.url)
      )
    )
    return await allPokemonResponse
  }

  public async getOnePokemon(URL: string): Promise<any> {
    const response = await fetch(URL)
    return await response.json()
  }
}
