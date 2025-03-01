import { Server } from 'socket.io';
import http from 'http';

let io: Server;

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!');
  }
  return io;
};

export default (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000', 
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
