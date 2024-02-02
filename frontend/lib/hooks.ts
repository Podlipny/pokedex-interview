import { useMemo } from 'react'
import { useQuery } from '@apollo/client'

import { GET_POKEMONS } from './queries'

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
