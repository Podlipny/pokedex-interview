import { useMemo } from 'react'
import { useQuery } from '@apollo/client'

import { GET_POKEMON, GET_POKEMONS } from './queries'

export const usePokemons = () => {
  const { data, refetch, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      query: {
        limit: 20,
        offset: 0,
      },
    },
  })

  const pokemons = useMemo(() => data?.pokemons?.edges ?? [], [data])

  return { pokemons, refetch, fetchMore }
}

export const usePokemon = <T>(name: string) => {
  const { data } = useQuery(GET_POKEMON, {
    variables: {
      name,
    },
  })

  return (data?.pokemonByName) as T
}
