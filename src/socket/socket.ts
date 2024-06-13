import { Socket, io } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../types/socket'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(import.meta.env.VITE_SOCKET_URL)
