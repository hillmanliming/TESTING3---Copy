const socket = io();

// Handle vote buttons
document.getElementById("voteA").addEventListener("click", () => {
  socket.emit("vote", "A");
});

document.getElementById("voteB").addEventListener("click", () => {
  socket.emit("vote", "B");
});
