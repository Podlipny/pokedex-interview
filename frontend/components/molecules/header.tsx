import { ReactNode, memo, useCallback } from 'react'

import { SectionToggle } from './sectionToggle'
import { Form } from './form'
import { ViewToggle } from './viewToggle'

import { Filter, ViewType } from '@/lib/types'

type HeaderProps = {
  filter: Filter
  pokemonTypes: string[]
  viewType: ViewType
  onChange: (filter: Filter) => void
  onViewChange: (viewType: ViewType) => void
}

export const Header = memo(({ filter, viewType, pokemonTypes, onChange, onViewChange }: HeaderProps): ReactNode => {
  const { search, sectionType, pokemonType } = filter

  const handleOnChange = useCallback((updatedFilter: Partial<Filter>) => {
    onChange?.({ ...filter, ...updatedFilter })
  }, [filter, onChange])

  return (
    <div className='px-4 lg:px-0 py-4 fixed w-screen max-w-[1024px] bg-white z-50 shadow'>
      <SectionToggle sectionType={sectionType} onChange={handleOnChange} />
      <span className='flex gap-4 pt-4 items-center'>
        <Form pokemonType={pokemonType} search={search} types={pokemonTypes} onChange={handleOnChange} />
        <ViewToggle viewType={viewType} onChange={onViewChange} />
      </span>
    </div>
  )
})

Header.displayName = 'Header'
