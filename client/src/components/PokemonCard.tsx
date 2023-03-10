import React from 'react'
import { IPokemon } from '../types'

export default function PokemonCard(props: any) {
  return (
    <div
      key={props.pokemon.id}
      className={`max-w-xs p-4 rounded border-2 border-slate-200 relative outline-offset-2 ${
        props.isChosen || props.isFull
          ? 'opacity-25'
          : 'hover:outline-primary hover:outline hover:outline-2'
      } ${
        props.isOnDeck
          ? 'border-secondary shadow-lg hover:shadow-sm hover:border-slate-100'
          : 'cursor-pointer'
      }`}
      onClick={
        props.isChosen || props.isFull || props.isOnDeck
          ? undefined
          : props.onClick
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`cursor-pointer w-6 h-6 absolute top-2 right-2 text-gray-300 hover:text-red-500 ${
          props.isOnDeck ? 'block' : 'hidden'
        }`}
        onClick={props.isChosen || props.isFull ? undefined : props.onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="rounded-sm w-full">
        <img
          src={props.pokemon.sprite}
          alt={props.pokemon.name}
          className="object-contain object-center mx-auto"
        />
      </div>
      {props.isOnDeck ? (
        <input
          type="text"
          name="pokemon"
          value={props.pokemon.name}
          onChange={(e) =>
            props.handleChangeName(e.target.value, props.pokemon.id)
          }
          className="input input-bordered input-xs w-full max-w-xs input-primary"
        />
      ) : (
        <p className="text-center capitalize">{props.pokemon.name}</p>
      )}
    </div>
  )
}
