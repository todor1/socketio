// http is a core node module
const http = require("http");
// ws is a third party module
const websocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am connected.");
});

const wss = new websocket.Server({ server });

// wss.on("headers", (headers, req) => {
//   console.log(headers);
// });

wss.on("connection", (ws, req) => {
  // console.log(ws);
  // console.log(req);
  ws.send("Welcome to the websocket server!");
  ws.on("message", (data) => {
    console.log(data.toString());
  });
});

server.listen(8000);
