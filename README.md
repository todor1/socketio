# socketio

Udemy course: SocketIO v4, with websockets - the 2023 details.

# In the project folder

1. npm init -y //initialize the package.json file
2. npm install express ... //install dependencies
3. npm install socket.io ... //install dependencies

https://socket.io/docs/v3/handling-cors/

If you have properly configured your server (see above), this could mean that your browser wasn't able to reach the Socket.IO server.

The following command:

curl "https://api.example.com/socket.io/?EIO=4&transport=polling"

curl "http://localhost:8000/socket.io/?EIO=4&transport=polling"

should return something like:

0{"sid":"Lbo5JLzTotvW3g2LAAAA","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000}

If that's not the case, please check that your server is listening and is actually reachable on the given port.

CORS Workaround - add-on Allow Cors / Mozilla, Chrome
