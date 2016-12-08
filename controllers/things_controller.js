const Thing = require('../models/thing');

module.exports = {
  index: (req, res) => {
    Thing.find((err, things) => {
      if (err) res.send(400, err);
      res.json(200, things);
    });
  },
  create: (req, res) => {
    Thing.create(req.body, (err, thing) => {
      if (err) res.send(err);
      res.json(201, thing);
    });
  },
  update: (req, res) => {
    Thing.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, thing) => {
      if (err) res.send(422, err);
      res.json(200, thing);
    });
  },
  destroy: (req, res) => {
    Thing.findOneAndRemove(req.params.id, (err) => {
      if (err) res.send(422, err);
      res.json(200, {message: 'del ok'});
    });
  }
};
