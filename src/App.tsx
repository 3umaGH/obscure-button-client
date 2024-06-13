import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Button } from './components/Button'
import { socket } from './socket/socket'

function App() {
  const [currentCount, setCount] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [transformStyle, setTransformStyle] = useState<CSSProperties>({ transform: 'translate(0,0)' })

  const userClickedCount = useRef(0)
  const soundRef = useRef<HTMLAudioElement>(null)

  const handleServerResponse = (count: number, activeUsers: number) => {
    setCount(prev => {
      if (count > prev) {
        const difference = count - prev

        for (let i = 0; i < difference; i++) {
          setTimeout(
            () => {
              playPopSound()
            },
            i * (Math.random() * 200)
          )
        }
      }

      return count
    })
    setActiveUsers(activeUsers)
  }

  const playPopSound = () => {
    const audio = soundRef.current

    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  useEffect(() => {
    socket.emit('getInitialValues', handleServerResponse)
    socket.on('updateCounter', handleServerResponse)

    return () => {
      socket.off('updateCounter')
    }
  }, [])

  const handleClick = () => {
    setCount(p => p + 1) // Optimistic update
    socket.emit('click', handleServerResponse)

    userClickedCount.current++

    playPopSound()

    if (userClickedCount.current > 500 && Math.random() * 100 < 10) {
      const randomX = Math.random() * 200 - 100
      const randomY = Math.random() * 300 - 150

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
        overflow: 'hidden',

        position: 'relative',
        zIndex: 10,
      }}>
      <audio ref={soundRef} src='/pop.ogg' />
      <div />

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 32, margin: '0 16px 0 16px' }}>
        <p style={{ fontSize: '1.75rem', fontWeight: 400, textAlign: 'center' }}>
          See nupp oli vajutatud{' '}
          <span style={{ color: currentCount % 100 === 0 ? 'red' : '#006EC8', fontWeight: 700 }}>
            {currentCount.toLocaleString()}
          </span>{' '}
          korda.
        </p>

        <div style={{ ...transformStyle, position: 'relative', zIndex: 400 }}>
          <Button onClick={handleClick} style={{ zIndex: 122, position: 'relative' }} />
        </div>

        <p style={{ fontSize: '1.25rem', fontWeight: 400, textAlign: 'center' }}>
          Siin on praegu <span style={{ color: '#006EC8', fontWeight: 700 }}>{activeUsers.toLocaleString()}</span>{' '}
          {activeUsers === 1 ? 'inimene' : 'inimest'} {':)'}
        </p>
      </div>

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
