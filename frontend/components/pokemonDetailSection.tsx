'use client'

import { memo } from 'react'

import { FavoriteButton } from './favouriteButton'
import styles from './pokemonDetailSection.module.scss'

import { PokemonDetail } from '@/lib/types'
import { usePokemon } from '@/lib/hooks'

type PokemonDetailSectionProps = {
  name: string
}

export const PokemonDetailSection = memo(({ name }: PokemonDetailSectionProps) => {
  const pokemon = usePokemon<PokemonDetail>(name)

  const { id, isFavorite, types, weight, height, maxHP, maxCP } = pokemon



  return (
    <div className={styles.wrapper}>
      <span className={styles.description}>
        <span>
          <h1>{name}</h1>
          <p>{types.map((type, index) => `${type}${index !== types.length - 1 ? ', ' : ''}`)}</p>
        </span>
        <FavoriteButton id={id} isFavorite={isFavorite} />
      </span>

      <span className={styles.statistics}>
        <div className='w-full h-2 bg-purple-300' />
        <strong>CP: {maxCP}</strong>
      </span>
      <span className={styles.statistics}>
        <div className='w-full h-2 bg-green-400' />
        <strong>HP: {maxHP}</strong>
      </span>

      <span className={styles.metrics}>
        <span className='flex flex-col justify-center items-center'>
          <h3>Weight</h3>
          <p>{`${weight?.minimum} - ${weight?.maximum}`}</p>
        </span>
        <span className='flex flex-col items-center'>
          <h3>Height</h3>
          <p>{`${height?.minimum} - ${height?.maximum}`}</p>
        </span>
      </span>
    </div>
  )
})

PokemonDetailSection.displayName = 'PokemonDetailSection'
