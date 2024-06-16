import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './components/Button'
import { LeaderBoard } from './components/LeaderBoard'
import { LeaderboardButton } from './components/LeaderboardButton'
import { SoundButton } from './components/SoundButton'
import { socket } from './socket/socket'
import { LeaderUser } from './types/socket'

function App() {
  const [currentCount, setCount] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)

  const [isLeadersVisible, setLeadersVisible] = useState(false)
  const [leaders, setLeaders] = useState<LeaderUser[]>([])

  const [transformStyle, setTransformStyle] = useState<CSSProperties>({ transform: 'translate(0,0)' })
  const [isMuted, setMuted] = useState(false)

  const userClickedTotalCount = useRef(0)
  const userClickedSessionCount = useRef(0)

  const soundRef = useRef<HTMLAudioElement>(null)

  const updateValues = useCallback((count: number, activeUsers: number) => {
    setCount(count)
    setActiveUsers(activeUsers)
  }, [])

  const handleSetInitialValues = useCallback(
    (count: number, activeUsers: number, leaderboard: LeaderUser[]) => {
      updateValues(count, activeUsers)
      setLeaders(leaderboard)
    },
    [updateValues]
  )

  const handleServerResponse = useCallback((count: number, activeUsers: number) => {
    setCount(prev => {
      if (count > prev) {
        const difference = count - prev

        for (let i = 0; i <= difference - 1; i++) {
          setTimeout(() => {
            playPopSound()
          }, Math.random() * 900)
        }
      }

      return count
    })
    setActiveUsers(activeUsers)
  }, [])

  const handleToggleMute = () => {
    setMuted(p => !p)
  }

  const handleToggleLeaders = () => {
    setLeadersVisible(p => !p)
  }

  const playPopSound = () => {
    const audio = soundRef.current

    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  useEffect(() => {
    socket.emit('getInitialValues', handleSetInitialValues)
    socket.on('updateCounter', handleServerResponse)
    socket.on('updateLeaders', setLeaders)

    const savedClicks = localStorage.getItem('clicks')

    if (!savedClicks) {
      localStorage.setItem('clicks', '0')
    } else {
      const toNumber = parseInt(savedClicks)

      if (!isNaN(toNumber) && toNumber > 0) {
        userClickedTotalCount.current = toNumber
      }
    }

    const saveInterval = setInterval(() => {
      localStorage.setItem('clicks', userClickedTotalCount.current.toString())
    }, 1000)

    return () => {
      socket.off('updateCounter')
      socket.off('updateLeaders')
      clearInterval(saveInterval)
    }
  }, [handleServerResponse, handleSetInitialValues, updateValues])

  const handleClick = () => {
    setCount(p => p + 1) // Optimistic update
    socket.emit('click', updateValues)

    userClickedSessionCount.current++
    userClickedTotalCount.current++

    playPopSound()

    if (userClickedSessionCount.current > 5000 && Math.random() * 100 < 10) {
      const randomX = Math.random() * 200 - 100
      const randomY = Math.random() * 300 - 100

      setTransformStyle({ transform: `translate(${randomX}%,${randomY}%)` })
    }
  }

  return (
    <div
      className='lato-regular'
      style={{
        width: '100%',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        userSelect: 'none',
        overflow: 'auto',

        position: 'relative',
        zIndex: 10,
      }}>
      <SoundButton
        isMuted={isMuted}
        onClick={handleToggleMute}
        style={{ position: 'absolute', top: 15, right: 15, opacity: 0.65 }}
      />

      <LeaderboardButton
        onClick={handleToggleLeaders}
        style={{ position: 'absolute', top: 55, right: 15, opacity: 0.55 }}
      />

      {!isMuted && <audio ref={soundRef} src='/pop.ogg' />}

      <div />

      <div
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 32, margin: '32px 48px 0 48px' }}>
        <p style={{ fontSize: '1.75rem', fontWeight: 400, textAlign: 'center' }}>
          Seda nuppu on vajutatud{' '}
          <span style={{ color: currentCount % 100 === 0 ? 'red' : '#006EC8', fontWeight: 700 }}>
            {currentCount.toLocaleString()}
          </span>{' '}
          korda.
        </p>

        <div style={{ ...transformStyle, position: 'relative', zIndex: 400 }}>
          <Button onClick={handleClick} style={{ zIndex: 122, position: 'relative' }} />
          <p style={{ textAlign: 'center', marginTop: 16, color: '#878787', fontSize: '0.85rem' }}>
            x {userClickedTotalCount.current.toLocaleString()}
          </p>
        </div>

        <p style={{ fontSize: '1.25rem', fontWeight: 400, textAlign: 'center' }}>
          Siin on praegu <span style={{ color: '#006EC8', fontWeight: 700 }}>{activeUsers.toLocaleString()}</span>{' '}
          {activeUsers === 1 ? 'inimene' : 'inimest'} {':)'}
        </p>
      </div>

      {isLeadersVisible && (
        <LeaderBoard leaders={leaders} clientID={socket.id} style={{ margin: '32px 0px 32px 0px' }} />
      )}

      <div style={{ justifySelf: 'end', margin: '10px', fontSize: '0.85rem', color: '#878787' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>mottetunupp.ee</p>
          <p>3uma@protonmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default App
