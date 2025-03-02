import type { Server as HTTPServer } from 'node:http';
import { Server } from 'socket.io';

let io: Server;

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!');
  }
  return io;
};

export default (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3002', 
            methods: ['GET', 'POST'],
            credentials: true
        },
        transports: ['websocket'],
    });

    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);
        socket.on('disconnect', () => console.log('Cliente desconectado'));
    });

    return io;
};
