import { ReactNode, memo, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PokemonItem } from '../pokemonItem'
import { Loader } from '../atoms/loader'

import { Pokemon, SectionType } from '@/lib/types'
import { cn } from '@/lib/utils'

type ListProps = {
  inline?: boolean
  pokemons: Pokemon[]
  sectionType: SectionType
  onFetchMore: () => void
}

export const List = memo(({ pokemons, inline, sectionType, onFetchMore }: ListProps): ReactNode => {
  const hasMore = useMemo(() => (pokemons?.length ? pokemons.length % 10 === 0 : false), [pokemons])
  const loader = useMemo(() => <Loader />, [])

  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={onFetchMore}
      hasMore={hasMore}
      loader={loader}
    >
      <div className={cn(
        inline ? 'grid grid-cols-1 sm:grid-cols-1 gap-2' : 'grid grid-cols-3 sm:grid-cols-4 gap-4',
      )}
      >
        {pokemons.map((pokemon) => (
          sectionType === SectionType.favorite && !pokemon?.isFavorite ? null : (
            <PokemonItem key={pokemon?.id} inline={inline as boolean} {...pokemon} />
          )))}
      </div>
    </InfiniteScroll>
  )
})

List.displayName = 'List'
