const path = require('path');

const ENV = process.env.NODE_ENV;

const _ = require('lodash');
const restify = require('restify');

const configuration = _.extend(require(path.resolve('./config/application.js')), require(path.resolve(`./config/${ENV}.js`)));

const server = restify.createServer(configuration);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require(path.resolve('./config/database.js'));
mongoose.connect(dbConfig[ENV].url);

require(path.resolve('./config/routes.js'))(server);

const port = configuration.port || 3000;
server.listen(port, () => {
  console.log(`server startup, listening ${port}`);
});

module.exports = server;
