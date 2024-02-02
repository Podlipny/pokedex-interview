import { ReactNode, memo, useCallback } from 'react'
import { Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/solid'

import { ViewType } from '@/lib/types'
import { cn } from '@/lib/utils'


type ViewToggleProps = {
  viewType: ViewType
  onChange: (viewType: ViewType) => void
}

export const ViewToggle = memo(({ viewType, onChange }: ViewToggleProps): ReactNode => {
  const handleViewTypeChange = useCallback((newViewType: ViewType) => () => {
    viewType !== newViewType && onChange?.(newViewType)
  }, [onChange, viewType])

  return (
    <div className='flex'>
      <span onClick={handleViewTypeChange(ViewType.list)}>
        <Bars3Icon className={cn(
          viewType === ViewType.list ? 'text-primary hover:text-primary-hover'
            : 'text-secondary-foreground hover:text-gray-300',
          'cursor-pointer h-8 w-8',
        )}
        />
      </span>
      <span className='mx-1 border-l-2 border-solid border-secondary h-8' />
      <span onClick={handleViewTypeChange(ViewType.grid)}>
        <Squares2X2Icon className={cn(
          viewType === ViewType.grid ? 'text-primary hover:text-primary-hover'
            : 'text-secondary-foreground hover:text-gray-300',
          'cursor-pointer h-8 w-8',
        )}
        />
      </span>
    </div>
  )
})

ViewToggle.displayName = 'ViewToggle'
