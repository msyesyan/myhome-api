const ENV = process.env.NODE_ENV;

const _ = require('lodash');
const restify = require('restify');

const configuration = _.extend(require('./config/application.js'), require(`./config/${ENV}.js`));
const server = restify.createServer(configuration);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

const mongoose = require('mongoose');
const dbConfig = require('./config/database.js');
mongoose.connect(dbConfig[ENV].url);

const port = configuration.port || 3000;
server.listen(port, () => {
  console.log(`server startup, listening ${port}`);
});

server.get('/', (req, res) => {
  res.send(200, { message: 'welcome' });
});


const BooksController = require('./controllers/things_controller');
server.get('/things', BooksController.index);
server.post('/things', BooksController.create);
server.put('/things/:id', BooksController.update);
server.del('/things/:id', BooksController.destroy);


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
