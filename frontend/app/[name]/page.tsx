import { GET_POKEMON } from '@/lib/queries'
import { useApolloClient } from '@/lib/client'
import { ApolloClientProvider } from '@/components/providers'

type PokemonDetailRouteProps = {
  params: {
    name: string
  }
}

export default async function PokemonDetailRoute({ params: { name } }: PokemonDetailRouteProps) {
  const client = useApolloClient()

  const escapedName = name.replace('%20', ' ')
  const { data } = await client.query({ query: GET_POKEMON, variables: { name: escapedName } })

  return (
    <main>
      <ApolloClientProvider initialApolloState={JSON.stringify(client.cache.extract())}>
        data: {JSON.stringify(data)}
      </ApolloClientProvider>
    </main>
  )
}
