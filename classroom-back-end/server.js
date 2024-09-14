import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './src/routes/auth.js';
import classRoutes from './src/routes/classes.js';
import commentRoutes from './src/routes/comments.js';

let PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/virtual-classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Routes
app.use('/auth', authRoutes);
app.use('/classes', classRoutes);
app.use('/sessions', commentRoutes);

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('comment', (comment) => {
    io.emit('comment', comment);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}....... :-) Yeah Buddy`);
});
