const Thing = require('../models/thing');

module.exports = {
  index: (req, res) => {
    Thing.find((err, things) => {
      if (err) res.json(400, err);
      res.json(200, things);
    });
  },
  create: (req, res) => {
    Thing.create(req.body.thing, (err, thing) => {
      if (err) res.json(422, err.errors);
      res.json(201, thing);
    });
  },
  update: (req, res) => {
    Thing.findOneAndUpdate(req.params.id, req.body.thing, {new: true}, (err, thing) => {
      if (err) res.json(422, err.errors);
      res.json(200, thing);
    });
  },
  destroy: (req, res) => {
    Thing.findOneAndRemove(req.params.id, (err) => {
      if (err) res.send(422, err.errors);
      res.json(200);
    });
  }
};
