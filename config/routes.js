const ThingsController = require('../controllers/things_controller');

module.exports = (app) => {
  app.get('/things', ThingsController.index);
  app.post('/things', ThingsController.create);
  app.put('/things/:id', ThingsController.update);
  app.del('/things/:id', ThingsController.destroy);
};
