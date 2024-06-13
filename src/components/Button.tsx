import { CSSProperties } from 'react'

export const Button = ({ onClick, style }: { onClick: () => void; style: CSSProperties }) => {
  return (
    <div
      className='button'
      onClick={onClick}
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '100%',
        overflow: 'clip',
        border: '2px solid lightgray',
        cursor: 'pointer',
        ...style,
      }}>
      <div style={{ width: '100%', height: '33.33%', backgroundColor: '#006EC8' }}></div>
      <div style={{ width: '100%', height: '33.33%', backgroundColor: 'black' }}></div>
      <div style={{ width: '100%', height: '33.33%', backgroundColor: 'white' }}></div>
    </div>
  )
}
