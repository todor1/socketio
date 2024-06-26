// 3rd party module from npm
const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
// const io = socketio(expressServer);

const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
});

// const io = socketio(expressServer, {
//   cors: {
//     origin: "http://localhost:8000",
//     methods: ["GET", "POST"],
//     // allowedHeaders: ["my-custom-header"],
//     credentials: false,
//   },
// });

io.on("connection", (socket) => {
  console.log(socket.id, "has connected.");
  // in ws we use the method "send"
  socket.emit("messageFromServer", { data: "Welcome to the socket server!" });
  socket.on("messageFromClient", (data) => {
    console.log("Data:", data);
  });
});
