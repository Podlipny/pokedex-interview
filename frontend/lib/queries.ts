import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query Pokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        id
        name
        classification
        isFavorite
        image
        types
        classification
      }
    }
  }
`

export const GET_POKEMON = gql`
  query PokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      classification
      isFavorite
      image
      types
      classification
    }
  }
`

export const GET_POKEMON_TYPES = gql`
  query PokemonTypes {
    pokemonTypes 
  }
`
