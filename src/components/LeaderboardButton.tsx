import icon from '../assets/leaderboard.svg'
import { CSSProperties } from 'react'

type LeaderboardButton = {
  onClick: () => void
  style?: CSSProperties
}

export const LeaderboardButton = ({ onClick, style }: LeaderboardButton) => {
  return (
    <div onClick={onClick} className='button' style={style}>
      <img src={icon} width={28} />
    </div>
  )
}
