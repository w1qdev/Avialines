import { io } from 'socket.io-client'
import { endpoints } from './api'

export const socket = io(endpoints.SERVER_ORIGIN_URI)