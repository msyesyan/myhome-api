const restify = require('restify');
const server = restify.createServer({
  name: 'myhome',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function(req, res, next) {
  res.send(200, { message: 'welcome' })
})

server.listen(3000)
