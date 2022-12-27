const net = require("net");

//Set up the Redis server (using Node.js net package)
//Respond to multiple PINGs: connection.on handles it (since listening to the `data` event)
  //No need to run a loop that reads input from connection
//createServer (or listening for data event in JS) will also automatically handle/respond to multiple PING commands sent by the same connection/client
//Handle concurrent connection: createServer handles concurrency
  //No need to use threads or implement an event loop

const server = net.createServer((connection) => {
  connection.on("data", (data) => {
    const dataInString = data.toString(); // convert byte data in Buffer obj to str (Redis command sent by client is in byte format in Buffer)
    //*2\r\n$4\r\nECHO\r\n$3\r\nhey\r\n
    console.log(dataInString); //*1 $4  ping 
    const parsed = parseRespArray(dataInString);
    console.log(parsed);


  });

  //extract the command and key from client's command RESP array (command: ECHO, key: hey)
  function parseRespArray(respArray) {
    console.log('respArray', respArray);
    const splitStr = respArray.split("\r\n");
    console.log('splitStr', splitStr);
    return splitStr;
  }

});



server.listen(6379, "127.0.0.1");