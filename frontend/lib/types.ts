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
