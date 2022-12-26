const net = require("net");

console.log("Program logs!");

const server = net.createServer((connection) => {
  // Handle connection: 
  // Add event listener for the "data" event
  connection.on("data", () => {
    //Send hard-coded response to client (since already known that sample req is PING)
    connection.write("+PONG\r\n")
    //In JS, listening for the data event will also automatically handle/respond to multiple PING commands sent by the same connection/client
    //Since the concurrency model is based on event loop in JS, above code will handle multiple concurrent clients
  });
});

server.listen(6379, "127.0.0.1");