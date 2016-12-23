const ENV = process.env.NODE_ENV;

const path = require('path');
const http = require('http');

const configuration = Object.assign(
  require(path.resolve('./config/application.js')),
  require(path.resolve(`./config/${ENV}.js`))
);

const router = require('./config/routes.js');

const server = http.createServer(router);

require(path.resolve('./database.js'))(ENV);


const port = configuration.port;
server.listen(port, configuration.hostname, (...args) => {
  console.log(args.length, args);
  console.log(`server startup, listening ${port}`);
});

module.exports = server;
