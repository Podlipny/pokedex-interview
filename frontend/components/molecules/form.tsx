import { ChangeEvent, MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { XMarkIcon } from '@heroicons/react/24/solid'

import { Input } from '../atoms/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../atoms/select'

import { Filter } from '@/lib/types'

type FormProps = {
  pokemonType: string | null
  types: string[]
  onChange: (filter: Partial<Filter>) => void
}

export const Form = ({ pokemonType, types, onChange }: FormProps): ReactNode => {
  const [value, setValue] = useState<string>('')
  const handleSelectChange = useCallback((type: string) => {
    pokemonType !== type && onChange?.({ pokemonType: type })
  }, [pokemonType, onChange])

  const debouncedSearch = useMemo(() => debounce((search: string) => {
    onChange?.({ search })
  }, 500), [onChange])

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch],
  )

  const handleClear = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()

    pokemonType !== null && onChange?.({ pokemonType: null })
  }, [onChange, pokemonType])

  return (
    <>
      <Input type='text' value={value} placeholder='Search' onChange={handleSearchChange} />
      <Select value={pokemonType || ''} onValueChange={handleSelectChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Type' />
        </SelectTrigger>
        <span className={`relative cursor-pointer opacity-${pokemonType ? '100' : '0'}`} onClick={handleClear}>
          <XMarkIcon className='absolute text-secondary-foreground top-[-8px] right-8 h-4 w-4' />
        </span>
        <SelectContent>
          {types?.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
