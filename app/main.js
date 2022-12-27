const net = require("net");

//Set up the Redis server (using Node.js net package)
//Respond to multiple PINGs: connection.on handles it (since listening to the `data` event)
  //No need to run a loop that reads input from connection
//createServer (or listening for data event in JS) will also automatically handle/respond to multiple PING commands sent by the same connection/client
//Handle concurrent connection: createServer handles concurrency
  //No need to use threads or implement an event loop

const server = net.createServer((connection) => {
  connection.on("data", (data) => {
    const dataInString = data.toString();
    console.log('data after convert byte data in Buffer object to str', dataInString);
  });
  
});



server.listen(6379, "127.0.0.1");