import { CSSProperties } from 'react'
import { LeaderUser } from '../types/socket'

export const LeaderBoard = ({
  leaders,
  clientID,
  style,
}: {
  leaders: LeaderUser[]
  clientID: string | undefined
  style?: CSSProperties
}) => {
  const formatLeaderID = (id: string) => {
    return id.slice(0, 4).toUpperCase().replace('_', 'A').replace('-', 'B')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <p style={{ textAlign: 'center', marginBottom: 16, fontSize: '1.15rem', color: '#878787' }}>Top 10:</p>
      <div className='grid' style={{ fontSize: '0.95rem' }}>
        <div className='container'>
          {leaders.map((leader, index) => {
            const isLeaderClient = leader.id === clientID
            const leaderID = isLeaderClient ? `SINA (${formatLeaderID(leader.id)}) ` : formatLeaderID(leader.id)

            return (
              <p
                key={leader.id}
                className='item'
                style={{ fontWeight: isLeaderClient ? 700 : 400, color: isLeaderClient ? '#006EC8' : 'black' }}>
                {`${index + 1}) `} {leaderID}
              </p>
            )
          })}
        </div>

        <div className='container'>
          {leaders.map(leader => {
            const isLeaderClient = leader.id === clientID

            return (
              <p
                key={leader.id}
                className='item'
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  fontWeight: isLeaderClient ? 700 : 500,
                  color: isLeaderClient ? '#006EC8' : 'black',
                }}>
                {leader.clicks.toLocaleString()}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
