import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { useMemo } from 'react'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

let apolloClientInstance: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_BE_URL,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemons: {
              keyArgs: false,

              // eslint-disable-next-line default-param-last
              merge(existing = [], incoming) {
                // eslint-disable-next-line no-underscore-dangle
                return { __typename: incoming?.__typename, edges: [...(existing?.edges || []), ...incoming.edges] }
              },
            },
          },
        },
        Pokemon: {
          keyFields: ['name'],
        },
      },
    }),
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const apolloClient = apolloClientInstance ?? createApolloClient()

  // get hydrated cache from server
  if (initialState) {
    const existingCache = apolloClient.cache.extract()

    const medgedCache = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    apolloClient.cache.restore(medgedCache)
  }
  // For server always create a new Apollo Client
  if (typeof window === 'undefined') return apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClientInstance) apolloClientInstance = apolloClient

  return apolloClient
}

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}

export const useApolloClient = () => initializeApollo()
