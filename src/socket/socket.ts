import { Socket, io } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket'

const isProduction = import.meta.env.MODE === 'production'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SOCKET_URL,
  isProduction
    ? {
        path: '/api/socket.io',
      }
    : {}
)
