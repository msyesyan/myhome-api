const path = require('path');
const mongoose = require('mongoose');
const dbConfig = require(path.resolve('./config/database.js'));

module.exports = (env = 'development') => {
  mongoose.connect(dbConfig[env].url);
  mongoose.Promise = global.Promise;

  return mongoose.connection;
};
