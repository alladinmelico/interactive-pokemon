import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import { IPokemon } from '../types'

export default function StarterPokemons(props: any) {
  const [chosenPokemons, setChosenPokemons] = useState<Array<IPokemon>>([])

  return (
    <div className="flex flex-wrap border-spacing-5 border-dashed border-slate-100 rounded-lg p-5 gap-5">
      {chosenPokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} isOnDeck={true} />
      ))}
      {Array.from(Array(3 - chosenPokemons.length)).map((item, index) => (
        <div
          key={index}
          className="h-40 w-36 rounded-lg border-dashed border-2 border-slate-300 "
        />
      ))}
    </div>
  )
}
