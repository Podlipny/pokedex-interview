'use client'

import { ReactNode, memo, useCallback } from 'react'
import { SpeakerWaveIcon } from '@heroicons/react/24/solid'

type ViewToggleProps = {
  sound: string
}

export const AudioButton = memo(({ sound }: ViewToggleProps): ReactNode => {
  const handleAudio = useCallback(() => {
    const audio = document.getElementById('pokemonSound') as HTMLAudioElement

    audio.play()
  }, [])

  return (
    <div className='absolute left-8 bottom-8 z-50'>
      <span className='cursor-pointer' onClick={handleAudio}>
        <SpeakerWaveIcon className='text-red hover:opacity-80 h-8 w-8' />
      </span>
      <audio id='pokemonSound' src={sound} />
    </div>
  )
})

AudioButton.displayName = 'AudioButton'
