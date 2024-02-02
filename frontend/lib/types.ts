export enum SectionType {
  all = 'all',
  favorite = 'favorite',
}

export enum ViewType {
  grid = 'grid',
  list = 'list',
}

export type Pokemon = {
  id: string
  name: string
  image: string
  isFavorite: boolean
  types: string[]
}

export type Filter = {
  search: string
  sectionType: SectionType
  pokemonType: string | null
}

type unit = {
  minimum: string
  maximum: string
}

export type PokemonDetail = {
  id: string
  name: string
  image: string
  isFavorite: boolean
  types: string[]
  sound: string
  classification: string
  maxHP: number
  maxCP: number
  weight: unit
  height: unit
  evolutions: Pokemon[]
}
