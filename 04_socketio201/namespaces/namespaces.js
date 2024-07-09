const express = require("express");
const app = express();
// require("socket.io") = Server in the docs (Server = constructor)
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

// io = the server object in the docs
const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
});

// io = actual server object in the docs (built upon Server constructor)
// io.on("connection", (socket) => {
// if no specific ns is provided, the socket will connect to the main ns
io.of("/").on("connection", (socket) => {
  io.of("/admin").emit("userJoinedMainNs", {});
  console.log(socket.id, "has connected.");
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient);
    // io.emit("newMessageToClients", { text: dataFromClient.text });
    io.of("/").emit("newMessageToClients", { text: dataFromClient.text });
  });
});

// handles only sockets connected to the particular namespace: /admin
io.of("/admin").on("connection", (socket) => {
  console.log(socket.id, "has connected to /admin.");
  io.of("/admin").emit("newMessageToClientsFromAdmin", {});
});
