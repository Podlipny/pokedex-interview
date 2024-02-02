import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query Pokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        id
        name
        isFavorite
        image
        types
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
      types
      image
      maxHP
      maxCP
      sound
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        id
        name
        image
        isFavorite
      }
    }
  }
`

export const GET_POKEMON_TYPES = gql`
  query PokemonTypes {
    pokemonTypes 
  }
`
