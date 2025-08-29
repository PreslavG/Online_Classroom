import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Allow CORS from your Firebase frontend
app.use(cors({
  origin: ["https://online-classroom-42fe3.web.app"], // your Firebase Hosting URL
  methods: ["GET", "POST"]
}));

const io = new Server(server, {
  cors: {
    origin: ["https://online-classroom-42fe3.web.app"],
    methods: ["GET", "POST"]
  }
});

// Socket.IO signaling
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("signal", ({ roomId, data }) => {
    socket.to(roomId).emit("signal", { sender: socket.id, data });
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// Port for hosting or local dev
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Socket.IO server running on port ${PORT}`));
