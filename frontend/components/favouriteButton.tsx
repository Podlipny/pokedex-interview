'use client'

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@apollo/client'
import { MouseEvent, useCallback } from 'react'

import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from '@/lib/mutations'

type FavoriteButtonProps = {
  id: string
  isFavorite: boolean
}

export const FavoriteButton = ({ id, isFavorite }: FavoriteButtonProps) => {
  const [favoritePokemon] = useMutation(FAVORITE_POKEMON)

  const [unfavoritePokemon] = useMutation(UNFAVORITE_POKEMON)

  const handleFavoritePokemon = useCallback((event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    event.preventDefault()
    favoritePokemon({ variables: { id } })
  }, [favoritePokemon, id])

  const handleUnfavoritePokemon = useCallback((event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    event.preventDefault()
    unfavoritePokemon({ variables: { id } })
  }, [unfavoritePokemon, id])

  return isFavorite ? (
    <span onClick={handleUnfavoritePokemon}>
      <HeartIconSolid className='cursor-pointer text-red hover:text-red-light h-6 w-6' />
    </span>
  ) : (
    <span onClick={handleFavoritePokemon}>
      <HeartIcon className='cursor-pointer text-red hover:text-red-light h-6 w-6' />
    </span>
  )
}
