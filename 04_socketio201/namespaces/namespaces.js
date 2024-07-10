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
  // rooms are entirely a server concept, the client does not know it is in a given room
  // calling join to subscribe the socket to a given channel, arbitrary string can be passed - treated as a room name [chat]
  socket.join("chat");
  io.of("/").to("chat").emit("welcomeToChatRoom", {});
  // socket.join("adminChat");
  // joining the room in itself does not do anything, we should emit to a certain room
  // emit to multiple rooms at the same time
  // io.of("/")
  //   .to("chat")
  //   .to("chat2")
  //   .to("adminChat")
  //   .emit("welcomeToChatRoom", {});

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
  // // you can have duplicate room name in different namespaces, but the rooms are ns specific
  // socket.join("chat");
  // io.of("/admin").to("chat").emit("welcomeToChatRoom", {});
});
