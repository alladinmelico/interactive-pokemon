import { useEffect, useState } from 'react'
import PokemonService from '../services/pokemon.service'
import { IPokemon } from '../types'
import { useNavigate } from 'react-router-dom'

export default function MyPokemons() {
  const [pokemons, setPokemons] = useState<Array<IPokemon>>([])
  const pokemonService = new PokemonService()
  const navigate = useNavigate()

  useEffect(() => {
    pokemonService.getMyPokemons().then((response) => {
      if (response.data.length) {
        setPokemons(response.data)
      } else {
        navigate('/onboarding')
      }
    })
  }, [])

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-10 mt-10">
      {pokemons.map((pokemon, index) => (
        <div key={pokemon.name} className="w-full p-5 rounded-lg shadow-lg">
          <div className="w-full">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`}
              alt={pokemon.name}
              className="object-contain object-center hover:animate-bounce cursor-pointer"
            />
          </div>
          <p className="capitalize text-center">
            {pokemon.name.replace(/-/g, '')}
          </p>
        </div>
      ))}
    </div>
  )
}
