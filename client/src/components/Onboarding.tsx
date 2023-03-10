import React, { useEffect, useState } from 'react'
import PokemonService from '../services/pokemon.service'
import { IPokemon } from '../types'
import PokemonCard from './PokemonCard'
import { useNavigate } from 'react-router-dom'
import ErrorAlert from './ErrorAlert'
import LoadingCard from './LoadingCard'

export default function Onboarding() {
  const [pokemons, setPokemons] = useState<Array<IPokemon>>([])
  const [chosenPokemons, setChosenPokemons] = useState<Array<IPokemon>>([])
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const pokemonService = new PokemonService()

  function handleChosenPokemon(index: number, toRemove: boolean = false) {
    if (toRemove) {
      setChosenPokemons((prev) => prev.filter((item, i) => i != index))
    } else {
      const chosenPokemon = { ...pokemons[index] }
      chosenPokemon.name = 'My ' + chosenPokemon.name
      setChosenPokemons((prev) => [...prev, chosenPokemon])
    }
  }

  function handleChangeName(input: string, id: number) {
    setChosenPokemons(
      chosenPokemons.map((pokemon) => {
        if (pokemon.id == id) {
          return { ...pokemon, name: input }
        }
        return pokemon
      })
    )
  }

  function isChosen(pokemon: IPokemon): boolean {
    return !!chosenPokemons.find((item) => item.id == pokemon.id)
  }

  function saveOnboardingPokemons() {
    pokemonService
      .saveOnboardingPokemons({
        pokemons: chosenPokemons.map((pokemon) => ({
          ...pokemon,
          pokemonId: pokemon.id,
        })),
      })
      .then((response) => {
        if (response.errors) {
          setError(response.errors[0].msg)
        } else {
          navigate('/')
        }
      })
  }

  function getAllPokemon(offset: number) {
    pokemonService.getAllPokemon(offset).then((response) => {
      setPokemons(
        response.map(
          (pokemon: any): IPokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
          })
        )
      )
    })
  }

  function getRandomSet() {
    const randomOffset = Math.floor(Math.random() * 1272)
    setPokemons([])
    getAllPokemon(randomOffset)
  }

  useEffect(() => {
    getAllPokemon(0)
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-100">
      <div className="h-full mx-auto">
        <h1 className="text-center text-3xl my-10">
          Choose your 3 <span className="text-primary">Starter Pokemon</span>
        </h1>
        <div className="flex flex-wrap justify-around items-center">
          <div className="border-2 border-dashed rounded-lg p-5">
            <div className="flex flex-wrap max-w-lg justify-center gap-5 ">
              {pokemons.length ? (
                pokemons.map((pokemon, index) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    isChosen={isChosen(pokemon)}
                    isFull={chosenPokemons.length == 3}
                    onClick={() => handleChosenPokemon(index)}
                  />
                ))
              ) : (
                <LoadingCard count={9} />
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="btn gap-2 btn-sm btn-outline btn-secondary"
                onClick={getRandomSet}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                    clipRule="evenodd"
                  />
                </svg>
                Get Random Set
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap border-spacing-5 border-dashed border-slate-100 rounded-lg p-5 gap-5">
              {chosenPokemons.map((pokemon, index) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isOnDeck={true}
                  onClick={() => handleChosenPokemon(index, true)}
                  handleChangeName={handleChangeName}
                />
              ))}
              {Array.from(Array(3 - chosenPokemons.length)).map(
                (item, index) => (
                  <div
                    key={index}
                    className="h-40 w-36 rounded-lg border-dashed border-2 border-slate-300 "
                  />
                )
              )}
            </div>
            <div className="mt-5 flex justify-end pr-5">
              {chosenPokemons.length == 3 && (
                <a href="#my-modal-2" className="btn gap-2 btn-primary">
                  Continue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              )}
            </div>

            <div className="modal" id="my-modal-2">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Are you sure with your chosen Pokemons?
                </h3>
                <p className="py-4">
                  You can no longer edit your Starter Pokemons after onboarding.
                </p>
                {error && <ErrorAlert error={error} />}
                <div className="modal-action">
                  <a href="#" className="btn btn-outline">
                    I'm not sure yet
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={saveOnboardingPokemons}
                  >
                    Let's go!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
