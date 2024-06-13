import { Socket, io } from 'socket.io-client'
import { ClientToServerEvents } from '../types/socket'

export const socket: Socket<ClientToServerEvents> = io(import.meta.env.VITE_SOCKET_URL)
