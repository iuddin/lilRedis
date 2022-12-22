const net = require("net");

console.log("Program logs!");

const server = net.createServer((connection) => {
  // Handle connection
  // Add event listener for the "data" event
  connection.on("data", () => {
    //Send hard-coded response to client (since already known that req is PING)
    connection.write("+PONG\r\n")
  });
});

server.listen(6379, "127.0.0.1");