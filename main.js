import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // adjust in production
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Chat message inside connection callback
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('user joined', (username) => {
    socket.username = username;
    io.emit('user joined', username);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000; // use env port in production
server.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
