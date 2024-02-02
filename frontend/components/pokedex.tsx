'use client'

import { useQuery } from '@apollo/client'
import { memo, useCallback } from 'react'

import { List, Header } from './molecules'

import { usePokedexStore } from '@/lib/store'
import { Filter, SectionType, ViewType } from '@/lib/types'
import { GET_POKEMON_TYPES } from '@/lib/queries'
import { usePokemons } from '@/lib/hooks'

export const Pokedex = memo(() => {
  const [filter, setFilter] = usePokedexStore(({ filter, setFilter }) => ([filter, setFilter]))
  const [viewType, setViewType] = usePokedexStore(({ viewType, setViewType }) => ([viewType, setViewType]))

  const { pokemons, refetch, fetchMore } = usePokemons()

  const { data: types } = useQuery(GET_POKEMON_TYPES)

  const handleRefetch = useCallback(({ search, pokemonType, sectionType }: Filter) => {
    refetch({
      query: {
        limit: 20,
        offset: 0,
        search,
        filter: {
          ...(pokemonType ? { type: pokemonType } : {}),
          isFavorite: sectionType === SectionType.favorite,
        },
      },
    })
  }, [refetch])

  const handleFetchMore = useCallback(() => {
    const { search, pokemonType, sectionType } = filter

    fetchMore({
      variables: {
        query: {
          limit: 10,
          offset: pokemons.length,
          search,
          filter: {
            type: pokemonType,
            isFavorite: sectionType === SectionType.favorite,
          },
        },
      },
    })
  }, [pokemons, fetchMore, filter])

  const handleFilterChange = useCallback((filter: Filter) => {
    setFilter(filter)
    handleRefetch(filter)
  }, [handleRefetch, setFilter])

  const handleViewTypeChange = useCallback((viewType: ViewType) => {
    setViewType(viewType)
  }, [setViewType])

  return (
    <div>
      <Header
        pokemonTypes={types?.pokemonTypes}
        filter={filter}
        viewType={viewType}
        onChange={handleFilterChange}
        onViewChange={handleViewTypeChange}
      />

      <div className='pt-[140px]'>
        <List
          inline={viewType === ViewType.list}
          pokemons={pokemons}
          sectionType={filter?.sectionType}
          onFetchMore={handleFetchMore}
        />
      </div>
    </div>
  )
})

Pokedex.displayName = 'Pokedex'
