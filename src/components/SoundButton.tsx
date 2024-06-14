import soundOff from '../assets/soundoff.svg'
import soundOn from '../assets/soundon.svg'
import { CSSProperties } from 'react'

type SoundButton = {
  isMuted: boolean
  onClick: () => void
  style?: CSSProperties
}

export const SoundButton = ({ isMuted, onClick, style }: SoundButton) => {
  return (
    <div onClick={onClick} className='button' style={style}>
      <img src={isMuted ? soundOff : soundOn} width={28} />
    </div>
  )
}
