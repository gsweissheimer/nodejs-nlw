import type { Server as HTTPServer } from 'node:http'
import { Server, type Socket } from 'socket.io'

let io: Server | null = null

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!')
  }
  return io
}

export default (server: HTTPServer): Server => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3002',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket'], // Força websocket puro
  })

  io.on('connection', (socket: Socket) => {
    console.log(`Cliente conectado: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`)
    })
  })

  return io
}
