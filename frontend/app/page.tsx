import { GET_POKEMONS, GET_POKEMON_TYPES } from '@/lib/queries'
import { useApolloClient } from '@/lib/client'
import { ApolloClientProvider } from '@/components/providers'
import { Pokedex } from '@/components/pokedex'

export default async function Home() {
  const client = useApolloClient()

  await client.query({
    query: GET_POKEMONS,
    variables: {
      query: {
        limit: 20,
        offset: 0,
        filter: {
          isFavorite: false,
        },
      },
    },
  })

  await client.query({ query: GET_POKEMON_TYPES })

  return (
    <main>
      <ApolloClientProvider initialApolloState={JSON.stringify(client.cache.extract())}>
        <Pokedex />
      </ApolloClientProvider>
    </main>
  )
}
