const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { saveVote, getVotes } = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// Real-time voting logic
let votes = { A: 0, B: 0 };

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send current votes to the connected user (both input and output devices)
  socket.emit("updateVotes", votes);

  // Listen for votes from input devices
  socket.on("vote", async (option) => {
    if (votes[option] !== undefined) {
      votes[option]++;
      await saveVote(option);
      io.emit("updateVotes", votes); // Broadcast updated votes to everyone
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
