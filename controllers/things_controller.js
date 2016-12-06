const Thing = require('../models/thing');

module.exports = {
  index: (req, res) => {
    let query = Thing.find({});
    query.exec((err, things) => {
      if (err) res.send(err);
      res.json(things);
    });
  },
  create: (req, res) => {
    Thing.create(req.body, (err, thing) => {
      if (err) res.send(err);
      res.json(thing);
    });
  },
  update: (req, res) => {
    Thing.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, thing) => {
      res.json(thing);
    });
  },
  destroy: (req, res) => {
    console.log('req.params.id', req.params.id);
    Thing.findOneAndRemove(req.params.id, (err) => {
      if (err) res.send(err);
      res.json({message: 'del ok'});
    });
  }
};
