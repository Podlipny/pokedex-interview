'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FavoriteButton } from './favouriteButton'
import styles from './pokemonItem.module.scss'

import { Pokemon } from '@/lib/types'
import { cn } from '@/lib/utils'

type PokemonItemProps = {
  inline: boolean
} & Pokemon

export const PokemonItem = memo(({ inline, id, name, image, isFavorite, types }: PokemonItemProps) => (
  <Link className={cn(styles.wrapper, inline && styles.inline)} href={`/${name}`}>
    <span className={styles.image}>
      <Image src={image} alt={name} width={inline ? 40 : 150} height={inline ? 40 : 150} quality={inline ? 20 : 80} />
    </span>
    <div className={styles.info}>
      <span>
        <h2>{name}</h2>
        <p>{types.map((type, index) => `${type}${index !== types.length - 1 ? ', ' : ''}`)}</p>
      </span>
      <FavoriteButton id={id} isFavorite={isFavorite} />
    </div>
  </Link>
))

PokemonItem.displayName = 'PokemonItem'
