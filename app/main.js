const net = require("net");

console.log("Program logs!");

const server = net.createServer((connection) => {
  // Handle connection
  // Add event listener for the "data" event
  connection.on("data", () => {
    //Send response to client
    connection.write("+PONG\r\n")
  });
});

server.listen(6379, "127.0.0.1");