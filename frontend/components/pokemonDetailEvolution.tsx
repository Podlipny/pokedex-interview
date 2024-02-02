'use client'

import { memo } from 'react'

import { PokemonItem } from './pokemonItem'

import { PokemonDetail } from '@/lib/types'
import { usePokemon } from '@/lib/hooks'

type PokemonDetailSectionProps = {
  name: string
  compact?: boolean
}

export const PokemonDetailEvolution = memo(({ name }: PokemonDetailSectionProps) => {
  const pokemon = usePokemon<PokemonDetail>(name)

  const { evolutions } = pokemon

  return (
    <>
      <h2 className='font-bold py-4 text-xl'>Evolutions</h2>
      <div className='flex flex-row gap-4'>
        {evolutions.map((evolution) => (
          <PokemonItem key={evolution.id} {...evolution} />
        ))}
      </div>
    </>
  )
})

PokemonDetailEvolution.displayName = 'PokemonDetailEvolution'
