import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Create a new object to store rooms and their files
const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle the join room event
  socket.on("join room", (roomId, fileObj) => {
    socket.join(roomId);

    // Check if the room exists in the rooms object
    if (!rooms[roomId]) {
      // Create a new entry for the room and update the files
      rooms[roomId] = fileObj;
    } else {
      // Send the current files object to the client
      socket.emit("files", rooms[roomId]);
    }
  });

  // Handle the code update event
  socket.on("code update", (roomId, updatedFiles) => {
    // Update the files object for the room
    rooms[roomId] = updatedFiles;

    // Broadcast the updated files object to all clients in the room
    io.to(roomId).emit("files", rooms[roomId]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
