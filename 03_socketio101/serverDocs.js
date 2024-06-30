const express = require("express");
const app = express();
// require("socket.io") = Server in the docs (Server = constructor)
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

// io = the server object in the docs
// const io = socketio(expressServer);
const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
});

// io = actual server object in the docs (built upon Server constructor)
io.on("connection", (socket) => {
  console.log(socket.id, "has connected.");
  // socket.emit("messageFromServer", { data: "Welcome to the socket server!" });
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});
