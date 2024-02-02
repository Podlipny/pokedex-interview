'use client'

import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

import { useApollo } from '@/lib/client'

type Props = {
  initialApolloState: string
  children: ReactNode
};

export const ApolloClientProvider = ({ initialApolloState, children }: Props) => {
  const apolloClient = useApollo(JSON.parse(initialApolloState))

  return (
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  )
}
