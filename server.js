const ENV = process.env.NODE_ENV;

const path = require('path');
const restify = require('restify');

const configuration = Object.assign(
  require(path.resolve('./config/application.js')),
  require(path.resolve(`./config/${ENV}.js`))
);

const server = restify.createServer(configuration);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

require(path.resolve('./database.js'))(ENV);

require(path.resolve('./config/routes.js'))(server);

const port = configuration.port || 3000;
server.listen(port, () => {
  console.log(`server startup, listening ${port}`);
});

module.exports = server;
