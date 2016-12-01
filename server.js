const _ = require('lodash');
const restify = require('restify');
const NODE_ENV = 'development';
const configuration = _.extend(require('./config/application.js'), require(`./config/${NODE_ENV}.js`));
const server = restify.createServer(configuration);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/myhome';
mongoose.connect(url);

server.listen(3000, () => {
  console.log('server startup, listening 3000');
});

// var DBClient = require('mongodb').MongoClient;
// var ObjectID = require('mongodb').ObjectID;
// var db;
// DBClient.connect(url, (err, database) => {
//   if (err) {
//     console.log('failed to connect db, error: ', err);
//   } else {
//     db = database;
//   }
//   server.listen(3000, () => {
//     console.log('server startup, listeninng ', 3000);
//   });
// });

server.get('/', (req, res) => {
  res.send(200, { message: 'welcome' });
});

// server.post('/things', (req, res) => {
//   db.collection('things').save(req.body, (err, result) => {
//     res.send(202, result);
//   });
// });
//
// server.get('/things', (req, res) => {
//   db.collection('things').find().toArray((err, things) => {
//     res.send(200, { things: things });
//   });
// });
//
// server.put('/things/:id', (req) => {
//   db.collection('things').updateOne({_id: ObjectID(req.params.id)}, {
//     $set: req.body
//   }, (err) => {
//     if (err) {
//       console.log('update fail', err.errmsg);
//     } else {
//       console.log('update success');
//     }
//   });
// });
//
// server.del('/things/:id', (req, res) => {
//   db.collection('things').remove({ _id: ObjectID(req.params.id) }, { justOne: true}, function(err, response) {
//     console.log(response.result.ok, response.result.n);
//     if (response.result.n) {
//       res.send(200, { message: 'del success' });
//     } else {
//       res.send(400, { message: 'del fail' });
//     }
//   });
// });
//
module.exports = server;
