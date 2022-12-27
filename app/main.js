const net = require("net");

//Set up the Redis server (using Node.js net package)
//Respond to multiple PINGs: connection.on handles it (since listening to the `data` event)
  //No need to run a loop that reads input from connection
//createServer (or listening for data event in JS) will also automatically handle/respond to multiple PING commands sent by the same connection/client
//Handle concurrent connection: createServer handles concurrency
  //No need to use threads or implement an event loop

//*1\r\n$4\r\nping\r\n - ping command
//*2\r\n$4\r\nECHO\r\n$3\r\nhey\r\n --> *2 $4 ECHO $3 hey --> [*2, $4, ECHO, $3, hey] -> i=2 for cmd, i=4 for value

const server = net.createServer((connection) => {
  connection.on("data", (data) => {
    const dataInString = data.toString(); // convert byte data in Buffer obj to str (Redis command sent by client is in byte format in Buffer)
    console.log(dataInString); //*1 $4  ping 
    const command = parseRespArray(dataInString); //command = obj
    if (command.cmd === 'ping') {
      connection.write("+PONG\r\n")
    } else if (command.cmd === 'echo') {
      console.log('cmmnd.val', command.val);
      connection.write(command.val);
    }


  });

  //extract the command and key from client's command RESP array (command: ECHO, key: hey)
  function parseRespArray(respArray) {
    console.log(respArray); //*1 $4  ping 
    const splitStr = respArray.split("\r\n"); //[ '*1', '$4', 'ping', '' ] 
    //FYI: if .split() then prints '*1 $4  ping' joined [ '*1\r\n$4\r\nping\r\n' ]
    const cmd = {"cmd": splitStr[2], "val": splitStr[4]};
    return cmd;
  } 

});



server.listen(6379, "127.0.0.1");