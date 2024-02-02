import { ReactNode, useCallback } from 'react'

import { Button } from '../atoms/button'

import { SectionType } from '@/lib/types'


type SectionToggleProps = {
  sectionType: SectionType
  onChange: (filter: { sectionType: SectionType }) => void
}

export const SectionToggle = ({ sectionType, onChange }: SectionToggleProps): ReactNode => {
  const handleSectionChange = useCallback((newSectionType: SectionType) => () => {
    sectionType !== newSectionType && onChange?.({ sectionType: newSectionType })
  }, [sectionType, onChange])

  return (
    <>
      <Button
        variant={sectionType === SectionType.all ? 'default' : 'outline'}
        onClick={handleSectionChange(SectionType.all)}
      >
        All
      </Button>
      <Button
        variant={sectionType === SectionType.favorite ? 'default' : 'outline'}
        onClick={handleSectionChange(SectionType.favorite)}
      >
        Favourite
      </Button>
    </>
  )
}
