import { create } from 'zustand'

import { Filter, SectionType, ViewType } from './types'

type PokedexStore = {
  filter: Filter
  viewType: ViewType
  setFilter: (filter: Filter) => void
  setViewType: (viewType: ViewType) => void
}

export const usePokedexStore = create<PokedexStore>((set) => ({
  filter: {
    search: '',
    sectionType: SectionType.all,
    pokemonType: null,
  },
  viewType: ViewType.grid,
  setFilter: (filter: Filter) => set(() => ({ filter })),
  setViewType: (viewType: ViewType) => set(() => ({ viewType })),
}))
