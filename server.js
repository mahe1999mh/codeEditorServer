require('dotenv').config();      
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (msg) => {
    console.log('Message:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/files", require('./routes/fileRoutes'));


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
