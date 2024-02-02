import { ReactNode, memo } from 'react'

export const Loader = memo((): ReactNode => (
  <h4 className='text-border animate-pulse'>Loading ...</h4>
))

Loader.displayName = 'Loader'
