const socket = io();

// Update votes on the screen
socket.on("updateVotes", (votes) => {
  document.getElementById("countA").textContent = votes.A;
  document.getElementById("countB").textContent = votes.B;
});
