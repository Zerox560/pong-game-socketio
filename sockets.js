let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    let room;

    socket.on("ready", () => {
      room = `room-${Math.floor(readyPlayerCount / 2)}`;
      socket.join(room);

      console.log(`Player ready on room: ${room}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", ({ xPosition }) => {
      socket.to(room).emit("paddleMove", { xPosition });
    });

    socket.on("ballMove", ({ ballX, ballY, score }) => {
      socket.to(room).emit("ballMove", { ballX, ballY, score });
    });

    socket.on("disconnect", (reason) => {
      console.log(`User ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
