const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected', socket);

  socket.on("chat", (payload)=> {
      console.log("What is Payload", payload);

      io.emit("chat", payload)
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});