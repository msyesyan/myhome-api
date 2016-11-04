const restify = require('restify');
const server = restify.createServer({
  name: 'myhome',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var DBClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017/myhome';
var db;
DBClient.connect(url, function(err, database) {
  if (err) {
    console.log('failed to connect db, error: ', err);
  } else {
    db = database;
  }
  server.listen(3000, function() {
    console.log('server startup, listeninng ', 3000);
  })
});

server.get('/', function(req, res, next) {
  res.send(200, { message: 'welcome' })
});

server.post('/things', function(req, res, next) {
  db.collection('things').save(req.body, function(err, result) {
    res.send(202, result);
  });
});

server.get('/things', function(req, res, next) {
  db.collection('things').find().toArray(function(err, things) {
    res.send(200, { things: things })
  });
});

server.put('/things/:id', function(req, res, next) {
  db.collection('things').updateOne({_id: ObjectID(req.params.id)}, {
    $set: req.body
  }, function(err, writeResult) {
    if (err) {
      console.log('update fail', err.errmsg);
    } else {
      console.log('update success')
    }
  });
});

server.del('/things/:id', function(req, res, next) {
  db.collection('things').remove({ _id: ObjectID(req.params.id) }, { justOne: true}, function(err, response) {
    console.log(response.result.ok, response.result.n)
    if (response.result.n) {
      res.send(200, { message: 'del success' });
    } else {
      res.send(400, { message: 'del fail' });
    }
  });
});
