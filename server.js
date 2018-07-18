//Holds all code to spin up nodejs server

/* can also be done using
 import {  } from "module";
 */
const http = require('http');
const app = require('./app');

/*port on which the server will run. 
If the environment variable port is set up then it will run on that port
or else it will run on port 3000*/
const port = process.env.PORT || 3000;

// using the http to create server
const server = http.createServer(app);

//to start the server on the port
server.listen(port);