import Image from 'next/image'

import styles from './page.module.scss'

import { GET_POKEMON } from '@/lib/queries'
import { useApolloClient } from '@/lib/client'
import { ApolloClientProvider } from '@/components/providers'
import { PokemonDetail } from '@/lib/types'
import { PokemonDetailSection } from '@/components/pokemonDetailSection'
import { PokemonDetailEvolution } from '@/components/pokemonDetailEvolution'
import { AudioButton } from '@/components/molecules/audioButton'

type PokemonDetailRouteProps = {
  params: {
    name: string
  }
}
type PokemonByNameData = {
  pokemonByName: PokemonDetail
}

export default async function PokemonDetailRoute({ params: { name: pathName } }: PokemonDetailRouteProps) {
  const client = useApolloClient()

  const escapedName = pathName.replace('%20', ' ')
  const { data } = await client.query<PokemonByNameData>({ query: GET_POKEMON, variables: { name: escapedName } })
  const { name, image, evolutions, sound } = data.pokemonByName

  return (
    <main>
      <ApolloClientProvider initialApolloState={JSON.stringify(client.cache.extract())}>
        <div className={styles.wrapper}>
          <span className={styles.imageWrapper}>
            <AudioButton sound={sound} />
            <Image className={styles.image} src={image} alt={name} width={500} height={500} quality={80} />
          </span>

          <PokemonDetailSection name={name} />
        </div>
        {evolutions.length && <PokemonDetailEvolution name={name} />}
      </ApolloClientProvider>
    </main>
  )
}
