const { app } = require("./api");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const sockets = require("./sockets");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

sockets.listen(io);
